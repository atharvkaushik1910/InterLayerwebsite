const taskInput = document.getElementById("taskInput");
const runBtn = document.getElementById("runBtn");
const currentStatus = document.getElementById("currentStatus");
const taskIdDisplay = document.getElementById("taskId");
const consoleOutput = document.getElementById("consoleOutput");
const liveViewFrame = document.getElementById("liveViewFrame");
const iframeContainer = document.getElementById("iframeContainer");
const externalLink = document.getElementById("externalLink");
const placeholder = document.querySelector(".placeholder");
const chatHistory = document.getElementById("chatHistory");
const startAgentBtn = document.getElementById("startAgentBtn");
const startAgentOverlay = document.getElementById("startAgentOverlay");
const micBtn = document.getElementById("micBtn");

// Refactored Speech Recognition for global access
let browserMicRecognition = null;
let isAgentSpeaking = false;

function startBrowserMic() {
    if (micBtn && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
        if (!browserMicRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            browserMicRecognition = new SpeechRecognition();
            browserMicRecognition.continuous = true;
            browserMicRecognition.lang = "en-US";
            browserMicRecognition.interimResults = false;

            browserMicRecognition.onstart = () => {
                micBtn.classList.add("recording");
                micBtn.style.color = "red";
                log("Browser Mic: Started listening...", "info");
                // removed addToChat to prevent spam on auto-restart
            };

            browserMicRecognition.onend = () => {
                micBtn.classList.remove("recording");
                micBtn.style.color = "";
                log("Browser Mic: Stopped listening (auto-restart pending).", "debug");
                // Attempt restart if supposedly continuous
                setTimeout(() => {
                    // Check if call is still active before restarting
                    if (dailyCallObject && dailyCallObject.participants().local) {
                        try {
                            log("Browser Mic: Auto-restarting...", "debug");
                            browserMicRecognition.start();
                        } catch (e) { }
                    }
                }, 1000);
            };

            browserMicRecognition.onresult = (event) => {
                if (isAgentSpeaking) {
                    log("Ignored audio (Agent is speaking)", "debug");
                    return;
                }

                const lastResultIndex = event.results.length - 1;
                const transcript = event.results[lastResultIndex][0].transcript;

                log(`Browser Mic Heard: ${transcript}`, "success");
                taskInput.value = transcript;

                // Auto-submit as requested
                handleInput();
            };

            browserMicRecognition.onerror = (event) => {
                console.error("Browser Mic Error:", event.error);
                // Don't auto-restart on 'not-allowed' or 'service-not-allowed'
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    log(`Browser Mic Access Denied: ${event.error}`, "error");
                }
            };
        }

        try {
            browserMicRecognition.start();
        } catch (e) {
            console.warn("Mic already started or error:", e);
        }

    } else {
        console.warn("Web Speech API not supported or micBtn missing.");
        addToChat("Browser Mic not supported in this browser.", "system");
    }
}


if (micBtn) {
    micBtn.addEventListener("click", () => {
        startBrowserMic();
    });
}

let pollingInterval;
let dailyCallObject = null;
let connectionTimeout = null;
let autoLeaveTimeout = null;
let sttSocket = null;
let mediaRecorder = null;
let transcriptionStarted = false;

function log(message, type = "system") {
    const entry = document.createElement("div");
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    consoleOutput.appendChild(entry);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function addToChat(message, sender = "system") {
    const entry = document.createElement("div");
    entry.className = `message ${sender}`;
    entry.style.marginTop = "5px";

    if (sender === "user") {
        entry.style.textAlign = "right";
        entry.style.color = "#007bff";
    } else {
        entry.style.textAlign = "left";
        entry.style.color = "#333";
    }

    entry.textContent = message;
    chatHistory.appendChild(entry);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function resetAgentUI() {
    if (startAgentOverlay) {
        startAgentOverlay.style.display = "flex";
    }
    if (startAgentBtn) {
        startAgentBtn.innerHTML = "Start Conversation";
        startAgentBtn.disabled = false;
    }
}

function cleanupDailyCall() {
    if (connectionTimeout) {
        clearTimeout(connectionTimeout);
        connectionTimeout = null;
    }

    if (autoLeaveTimeout) {
        clearTimeout(autoLeaveTimeout);
        autoLeaveTimeout = null;
    }

    stopTranscription();
    transcriptionStarted = false;

    if (dailyCallObject) {
        try {
            dailyCallObject.destroy();
        } catch (e) {
            console.warn("Error destroying Daily call object:", e);
        }
        dailyCallObject = null;
    }

    const videoContainer = document.getElementById("interLayerVideoContainer");
    if (videoContainer) {
        videoContainer.innerHTML = "";
    }
}

function createVideoElement(participantId, isLocal = false) {
    const videoContainer = document.getElementById("interLayerVideoContainer");

    const wrapper = document.createElement("div");
    wrapper.id = `video-wrapper-${participantId}`;
    wrapper.style.cssText = `
    position: ${isLocal ? "absolute" : "relative"};
    width: ${isLocal ? "200px" : "100%"};
    height: ${isLocal ? "150px" : "100%"};
    ${isLocal ? "display: none !important;" : ""} 
  `;

    const videoEl = document.createElement("video");
    videoEl.id = `video-${participantId}`;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.muted = isLocal;
    videoEl.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: #000;
  `;

    const label = document.createElement("div");
    label.textContent = isLocal ? "You" : "InterLayer Agent";
    label.style.cssText = `
    position: absolute;
    bottom: 10px;
    left: 10px;
    color: white;
    background: rgba(0, 0, 0, 0.6);
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    z-index: 11;
  `;

    wrapper.appendChild(videoEl);
    wrapper.appendChild(label);
    videoContainer.appendChild(wrapper);

    return videoEl;
}

function updateVideoTrack(participantId, track, isLocal = false) {
    let videoEl = document.getElementById(`video-${participantId}`);

    if (!videoEl && track) {
        videoEl = createVideoElement(participantId, isLocal);
    }

    if (videoEl && track) {
        videoEl.srcObject = new MediaStream([track.persistentTrack || track.track]);
        videoEl.play().catch((e) => {
            console.warn(`Error playing video for ${participantId}:`, e);
        });
    }
}

function updateAudioTrack(participantId, track) {
    let audioEl = document.getElementById(`audio-${participantId}`);

    if (!audioEl && track) {
        audioEl = document.createElement("audio");
        audioEl.id = `audio-${participantId}`;
        audioEl.autoplay = true;
        document.body.appendChild(audioEl);
    }

    if (audioEl && track) {
        audioEl.srcObject = new MediaStream([track.persistentTrack || track.track]);
        audioEl.play().catch((e) => {
            console.warn(`Error playing audio for ${participantId}:`, e);
        });
    }
}

async function startTranscription_DISABLED() {
    try {
        log("Starting AssemblyAI transcription...", "info");

        // Wait for Daily to fully initialize audio tracks
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Get the local audio track from Daily
        const participants = dailyCallObject.participants();
        const localParticipant = participants.local;

        if (!localParticipant || !localParticipant.tracks.audio) {
            throw new Error("No local audio track available from Daily");
        }

        // Get the MediaStreamTrack from Daily
        const audioTrack =
            localParticipant.tracks.audio.persistentTrack ||
            localParticipant.tracks.audio.track;

        if (!audioTrack) {
            throw new Error("Could not access audio track from Daily");
        }

        console.log("Using Daily audio track for transcription:", audioTrack);

        // Create a MediaStream from the Daily audio track
        const stream = new MediaStream([audioTrack]);

        const token = "83515da6633f41f29ede079d601fe283";
        const socket = new WebSocket(
            `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`,
        );

        sttSocket = socket;

        socket.onopen = () => {
            log("AssemblyAI WebSocket connected", "success");
            addToChat("Voice transcription started", "system");
            console.log("AssemblyAI: Connected to transcription service");

            // Start recording AFTER socket is open
            try {
                const recorder = new RecordRTC(stream, {
                    type: "audio",
                    mimeType: "audio/webm;codecs=pcm",
                    recorderType: RecordRTC.StereoAudioRecorder,
                    timeSlice: 250,
                    desiredSampRate: 16000,
                    numberOfAudioChannels: 1,
                    bufferSize: 4096,
                    audioBitsPerSecond: 128000,
                    ondataavailable: (blob) => {
                        if (socket.readyState === WebSocket.OPEN) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const base64data = reader.result.split(",")[1];
                                socket.send(JSON.stringify({ audio_data: base64data }));
                            };
                            reader.readAsDataURL(blob);
                        }
                    },
                });

                recorder.startRecording();
                mediaRecorder = recorder;

                log("Audio recording started", "success");
                console.log("AssemblyAI: Now transcribing audio from Daily...");
            } catch (recError) {
                console.error("Error starting recorder:", recError);
                log(`Recording error: ${recError.message}`, "error");
            }
        };

        socket.onmessage = (message) => {
            const res = JSON.parse(message.data);
            console.log("AssemblyAI message:", res.message_type);

            if (res.message_type === "SessionBegins") {
                log("Transcription session active", "success");
                console.log("Session info:", res);
            } else if (res.message_type === "FinalTranscript") {
                if (res.text && res.text.trim().length > 0) {
                    console.log(`[FINAL TRANSCRIPT]: ${res.text}`);
                    log(`You said: ${res.text}`, "success");
                    // addToChat(res.text, "user"); // handleVoiceCommand adds to chat

                    // Trigger the agent with the transcribed text
                    handleVoiceCommand(res.text);
                }
            } else if (res.message_type === "PartialTranscript") {
                if (res.text && res.text.trim().length > 0) {
                    console.log(`[INTERIM]: ${res.text}`);
                }
            }
        };

        socket.onerror = (error) => {
            console.error("AssemblyAI WebSocket error:", error);
            log("Transcription error", "error");
        };

        socket.onclose = (event) => {
            console.log(
                "AssemblyAI: WebSocket closed",
                event.code,
                event.reason || "No reason provided",
            );
            log("Transcription stopped", "info");
        };
    } catch (error) {
        console.error("Failed to start transcription:", error);
        log(`Transcription error: ${error.message}`, "error");
        addToChat(
            "Could not start voice transcription. Please check microphone permissions.",
            "system",
        );
    }
}

function stopTranscription() {
    if (mediaRecorder) {
        try {
            if (mediaRecorder.stopRecording) {
                mediaRecorder.stopRecording();
                log("Audio recording stopped", "info");
            }
        } catch (e) {
            console.warn("Error stopping recorder:", e);
        }
        mediaRecorder = null;
    }

    if (sttSocket) {
        try {
            if (sttSocket.readyState === WebSocket.OPEN) {
                sttSocket.close();
                log("Transcription connection closed", "info");
            }
        } catch (e) {
            console.warn("Error closing AssemblyAI socket:", e);
        }
        sttSocket = null;
    }

    transcriptionStarted = false;
}

async function startAgentSession() {
    startAgentBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';
    startAgentBtn.disabled = true;
    log("Initializing Agent session...", "info");

    try {
        const response = await fetch("/api/agent/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                conversational_context: "You are InterLayer, a Human Computing agent. Your purpose is to replace manual workflows with emotionally intelligent, autonomous action. You are NOT a chatbot; you are a digital presence. Speak naturally, show empathy, and take initiative. When the user asks for a task, Orchestrate it immediately via the browser agent. Confirm briefly ('I'll handle that', 'On it') and avoid robotic repetition. If interrupted, stop instantly."
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.detail || "Failed to start Agent session");
        }

        const data = await response.json();
        log(`Agent session created. URL: ${data.conversation_url}`, "success");

        if (!data.conversation_url) {
            throw new Error("No conversation_url returned from API");
        }

        if (!window.Daily) {
            throw new Error(
                "Daily.co SDK not loaded. Check internet connection or ad blockers.",
            );
        }

        const videoContainer = document.getElementById("interLayerVideoContainer");
        if (!videoContainer) {
            throw new Error("Video container element not found");
        }

        cleanupDailyCall();

        log("Creating Daily call object...", "info");

        dailyCallObject = window.Daily.createCallObject();

        connectionTimeout = setTimeout(() => {
            log("Connection timeout - taking too long to connect", "error");
            addToChat("Connection timed out. Please try again.", "system");
            cleanupDailyCall();
            resetAgentUI();
        }, 30000);

        dailyCallObject.on("loading", (event) => {
            log("Loading Daily resources...", "info");
        });

        dailyCallObject.on("loaded", (event) => {
            log("Daily resources loaded", "success");
        });

        dailyCallObject.on("started-camera", async (event) => {
            log("Camera started", "success");
        });

        dailyCallObject.on("camera-error", (event) => {
            log(
                `Camera Error: ${event?.errorMsg || "Camera access denied"}`,
                "error",
            );
            console.error("Camera Error:", event);
            addToChat("Camera error. Please check permissions.", "system");
        });

        dailyCallObject.on("joining-meeting", (event) => {
            log("Joining meeting...", "info");
        });

        dailyCallObject.on("joined-meeting", async (event) => {
            log("Successfully joined meeting!", "success");
            addToChat("Connected! Waiting for InterLayer Agent...", "system");

            if (connectionTimeout) {
                clearTimeout(connectionTimeout);
                connectionTimeout = null;
            }

            if (startAgentOverlay) {
                startAgentOverlay.style.display = "none";
            }

            const localParticipant = event.participants.local;
            if (localParticipant) {
                const tracks = localParticipant.tracks;
                if (tracks.video) {
                    updateVideoTrack(localParticipant.session_id, tracks.video, true);
                }
            }

            // Start transcription after successfully joining
            if (!transcriptionStarted) {
                transcriptionStarted = true;
                // await startTranscription(); // Disabled to prevent conflict and use Web Speech API instead
                log("AssemblyAI transcription disabled in favor of Web Speech API", "info");
            }
        });

        dailyCallObject.on("participant-joined", (event) => {
            const participant = event.participant;
            const participantName =
                participant.user_name || participant.user_id || "Unknown";
            log(`Participant joined: ${participantName}`, "info");

            if (!participant.local) {
                addToChat("InterLayer Agent has joined the call!", "system");
                log("InterLayer Agent is now in the call", "success");

                // Auto-start browser mic as requested
                log("Auto-starting browser mic...", "info");
                startBrowserMic();
            }
        });

        dailyCallObject.on("participant-updated", (event) => {
            const participant = event.participant;
            const participantId = participant.session_id;
            const tracks = participant.tracks;

            if (tracks.video && tracks.video.state === "playable") {
                updateVideoTrack(participantId, tracks.video, participant.local);
            }

            if (
                !participant.local &&
                tracks.audio &&
                tracks.audio.state === "playable"
            ) {
                updateAudioTrack(participantId, tracks.audio);
            }
        });

        dailyCallObject.on("participant-left", (event) => {
            const participantId = event.participant.session_id;
            const participantName =
                event.participant.user_name || event.participant.user_id || "Unknown";
            log(`Participant left: ${participantName}`, "info");

            const videoWrapper = document.getElementById(
                `video-wrapper-${participantId}`,
            );
            if (videoWrapper) videoWrapper.remove();

            const audioEl = document.getElementById(`audio-${participantId}`);
            if (audioEl) audioEl.remove();
        });

        dailyCallObject.on("track-started", async (event) => {
            const trackType = event.track?.kind || "unknown";
            const participantId = event.participant?.session_id;
            log(`Track started: ${trackType} for ${participantId}`, "success");
        });

        dailyCallObject.on("track-stopped", (event) => {
            const trackType = event.track?.kind || "unknown";
            log(`Track stopped: ${trackType}`, "info");
        });

        dailyCallObject.on("left-meeting", (event) => {
            log("Left meeting", "info");
            addToChat("Call ended.", "system");
            cleanupDailyCall();
            resetAgentUI();
        });

        dailyCallObject.on("active-speaker-change", (event) => {
            const activeSpeakerPeerId = event.activeSpeaker.peerId;
            const localPeerId = dailyCallObject.participants().local.session_id;

            // If active speaker is NOT local (meaning it's the agent), gate the mic
            if (activeSpeakerPeerId && activeSpeakerPeerId !== localPeerId) {
                isAgentSpeaking = true;
                log("Agent speaking - Mic gated", "debug");
                micBtn.style.opacity = "0.5";
            } else {
                // Slight delay to ensure agent is truly done to handle pauses
                setTimeout(() => {
                    isAgentSpeaking = false;
                    micBtn.style.opacity = "1";
                    log("Agent stopped - Mic active", "debug");
                }, 500);
            }
        });

        dailyCallObject.on("error", (event) => {
            const errorMsg =
                event?.errorMsg || event?.error?.msg || event?.error || "Unknown error";
            log(`Daily Error: ${errorMsg}`, "error");
            console.error("Daily Error:", event);
            addToChat(`Error: ${errorMsg}`, "system");
            cleanupDailyCall();
            resetAgentUI();
        });

        log("Joining Daily room...", "info");
        addToChat(
            "Connecting to video... Please allow Camera/Microphone access if prompted.",
            "system",
        );

        try {
            await dailyCallObject.join({
                url: data.conversation_url,
            });

            log("Join request completed", "success");
        } catch (joinError) {
            throw new Error(`Failed to join: ${joinError.message}`);
        }
    } catch (e) {
        console.error("Agent session error:", e);
        log(`Agent Error: ${e.message}`, "error");
        addToChat(`Error: ${e.message}`, "system");
        alert("Agent Error: " + e.message);
        cleanupDailyCall();
        resetAgentUI();
    }
}

if (startAgentBtn) {
    startAgentBtn.addEventListener("click", startAgentSession);
}

function updateLiveView(url) {
    if (url) {
        liveViewFrame.src = url;
        liveViewFrame.classList.add("active");
        placeholder.style.display = "none";
        externalLink.href = url;
    }
}

async function handleInput() {
    const query = taskInput.value.trim();
    if (!query) return;

    addToChat(query, "user");
    taskInput.value = "";

    await processQuery(query);
}

// Function to handle voice commands directly
async function handleVoiceCommand(text) {
    if (!text) return;
    addToChat(text, "user");
    await processQuery(text);
}

// Core logic to send query to backend
async function processQuery(query) {
    runBtn.disabled = true;
    runBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Thinking...';

    try {
        const intentResponse = await fetch("/api/process_intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query }),
        });

        const intent = await intentResponse.json();

        if (intent.type === "conversation") {
            addToChat(intent.message, "agent");
            runBtn.disabled = false;
            runBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';
        } else if (intent.type === "action") {
            addToChat(intent.message, "agent");
            log("Agent started action: " + intent.task, "info");
            await startTask(intent.task);
        }
    } catch (error) {
        log(`Error: ${error.message}`, "error");
        runBtn.disabled = false;
        runBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';
    }
}

async function startTask(taskDescription) {
    currentStatus.textContent = "Starting...";

    try {
        const response = await fetch("/api/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: taskDescription }),
        });

        if (!response.ok) throw new Error("Failed to start task");

        const data = await response.json();
        const taskId = data.taskId;
        const liveUrl = data.liveUrl;

        taskIdDisplay.textContent = taskId;
        log(`Task created. ID: ${taskId}`, "success");

        if (liveUrl) {
            log(`Live view available`, "info");
            updateLiveView(liveUrl);
        }

        pollStatus(taskId, data.sessionId);
    } catch (error) {
        log(`Error: ${error.message}`, "error");
        runBtn.disabled = false;
        runBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';
        currentStatus.textContent = "Error";
    }
}

async function pollStatus(taskId, sessionId) {
    // Clear any existing global interval to prevent duplicates
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }

    const intervalId = setInterval(async () => {
        try {
            const taskResponse = await fetch(`/api/task/${taskId}`);
            const data = await taskResponse.json();

            const status = data.status;
            currentStatus.textContent = status.toUpperCase();

            // Check if live view is available (if not already set)
            if (!liveViewFrame.src && sessionId) {
                const sessionResponse = await fetch(`/api/session/${sessionId}`);
                const sessionData = await sessionResponse.json();
                if (sessionData.liveUrl) {
                    log(`Live view available: ${sessionData.liveUrl}`, "info");
                    updateLiveView(sessionData.liveUrl);
                }
            }

            if (status === "finished" || status === "stopped") {
                clearInterval(intervalId); // Stop THIS interval
                if (pollingInterval === intervalId) {
                    pollingInterval = null; // Clear global if it matches
                }

                runBtn.disabled = false;
                runBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send';

                if (data.output) {
                    log("Task Completed!", "success");
                    log(`Output: ${JSON.stringify(data.output, null, 2)}`, "success");
                    addToChat("I've finished the task.", "agent");
                } else {
                    log("Task Stopped.", "system");
                }
            } else if (status === "paused") {
                log("Task Paused.", "system");
            }
        } catch (error) {
            console.error("Polling error:", error);
        }
    }, 2000);

    pollingInterval = intervalId;
}

runBtn.addEventListener("click", handleInput);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleInput();
    }
});
