import * as THREE from 'three/webgpu'
import { color, float, Fn, instancedArray, mix, normalWorld, positionGeometry, step, texture, uniform, uv, vec2, vec3, vec4 } from 'three/tsl'
import { Inputs } from '../../Inputs/Inputs.js'
import { InteractivePoints } from '../../InteractivePoints.js'
import { Area } from './Area.js'
import gsap from 'gsap'
import { MeshDefaultMaterial } from '../../Materials/MeshDefaultMaterial.js'
import { TextCanvas } from '../../TextCanvas.js'

export class LandingArea extends Area {
    constructor(model) {
        super(model)

        this.localTime = uniform(0)

        this.setLetters()
        this.setKiosk()
        this.setControls()
        this.setBonfire()
        this.setAchievement()
    }

    setLetters() {
        const references = this.references.items.get('letters')
        let centerPosition = new THREE.Vector3()
        let count = 0

        for (const reference of references) {
            if (reference.userData.object) {
                reference.userData.object.visible = false

                // Calculate average center
                if (reference.userData.object.position) {
                    centerPosition.add(reference.userData.object.position)
                    count++
                }
            }
            // Fallback: try hiding the reference itself if it's a mesh
            if (reference.visible !== undefined) reference.visible = false;
        }

        console.log('LandingArea: Hidden letters count:', count)

        if (count > 0) centerPosition.divideScalar(count)

        // Create InterLayer Sign
        const textCanvas = new TextCanvas(
            'Amatic SC',
            700,
            1,
            20,
            4,
            128,
            'center',
            1
        )
        textCanvas.updateText('INTERLAYER')

        const material = new MeshDefaultMaterial({
            transparent: true,
            alphaNode: texture(textCanvas.texture).r,
            colorNode: color('#ffffff'),
            hasWater: false
        })

        const geometry = new THREE.PlaneGeometry(20, 4)
        const mesh = new THREE.Mesh(geometry, material)

        // Position roughly where letters were, slightly up
        mesh.position.copy(centerPosition)
        mesh.position.y += 0.5
        mesh.position.z += 2
        mesh.rotation.x = -Math.PI * 0.5
        mesh.rotation.z = Math.PI * 0.15 // Slight angle to match path

        this.game.scene.add(mesh)
    }

    setKiosk() {
        // Interactive point
        const interactivePoint = this.game.interactivePoints.create(
            this.references.items.get('kioskInteractivePoint')[0].position,
            'Map',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () => {
                this.game.inputs.interactiveButtons.clearItems()
                this.game.modals.open('map')
                // interactivePoint.hide()
            },
            () => {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () => {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () => {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )

        // this.game.map.items.get('map').events.on('close', () =>
        // {
        //     interactivePoint.show()
        // })
    }

    setControls() {
        // Interactive point
        const interactivePoint = this.game.interactivePoints.create(
            this.references.items.get('controlsInteractivePoint')[0].position,
            'Controls',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () => {
                this.game.inputs.interactiveButtons.clearItems()
                this.game.menu.open('controls')
                interactivePoint.hide()
            },
            () => {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () => {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () => {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )

        // Menu instance
        const menuInstance = this.game.menu.items.get('controls')

        menuInstance.events.on('close', () => {
            interactivePoint.show()
        })

        menuInstance.events.on('open', () => {
            if (this.game.inputs.mode === Inputs.MODE_GAMEPAD)
                menuInstance.tabs.goTo('gamepad')
            else if (this.game.inputs.mode === Inputs.MODE_MOUSEKEYBOARD)
                menuInstance.tabs.goTo('mouse-keyboard')
            else if (this.game.inputs.mode === Inputs.MODE_TOUCH)
                menuInstance.tabs.goTo('touch')
        })
    }

    setBonfire() {
        const position = this.references.items.get('bonfireHashes')[0].position

        // Particles
        let particles = null
        {
            const emissiveMaterial = this.game.materials.getFromName('emissiveOrangeRadialGradient')

            const count = 30
            const elevation = uniform(5)
            const positions = new Float32Array(count * 3)
            const scales = new Float32Array(count)


            for (let i = 0; i < count; i++) {
                const i3 = i * 3

                const angle = Math.PI * 2 * Math.random()
                const radius = Math.pow(Math.random(), 1.5) * 1
                positions[i3 + 0] = Math.cos(angle) * radius
                positions[i3 + 1] = Math.random()
                positions[i3 + 2] = Math.sin(angle) * radius

                scales[i] = 0.02 + Math.random() * 0.06
            }

            const positionAttribute = instancedArray(positions, 'vec3').toAttribute()
            const scaleAttribute = instancedArray(scales, 'float').toAttribute()

            const material = new THREE.SpriteNodeMaterial()
            material.outputNode = emissiveMaterial.outputNode

            const progress = float(0).toVar()

            material.positionNode = Fn(() => {
                const newPosition = positionAttribute.toVar()
                progress.assign(newPosition.y.add(this.localTime.mul(newPosition.y)).fract())

                newPosition.y.assign(progress.mul(elevation))
                newPosition.xz.addAssign(this.game.wind.direction.mul(progress))

                const progressHide = step(0.8, progress).mul(100)
                newPosition.y.addAssign(progressHide)

                return newPosition
            })()
            material.scaleNode = Fn(() => {
                const progressScale = progress.remapClamp(0.5, 1, 1, 0)
                return scaleAttribute.mul(progressScale)
            })()

            const geometry = new THREE.CircleGeometry(0.5, 8)

            particles = new THREE.Mesh(geometry, material)
            particles.visible = false
            particles.position.copy(position)
            particles.count = count
            this.game.scene.add(particles)
        }

        // Hashes
        {
            const alphaNode = Fn(() => {
                const baseUv = uv(1)
                const distanceToCenter = baseUv.sub(0.5).length()

                const voronoi = texture(
                    this.game.noises.voronoi,
                    baseUv
                ).g

                voronoi.subAssign(distanceToCenter.remap(0, 0.5, 0.3, 0))

                return voronoi
            })()

            const material = new MeshDefaultMaterial({
                colorNode: color(0x6F6A87),
                alphaNode: alphaNode,
                hasWater: false,
                hasLightBounce: false
            })

            const mesh = this.references.items.get('bonfireHashes')[0]
            mesh.material = material
        }

        // Burn
        const burn = this.references.items.get('bonfireBurn')[0]
        burn.visible = false

        // Interactive point
        this.game.interactivePoints.create(
            this.references.items.get('bonfireInteractivePoint')[0].position,
            'Res(e)t',
            InteractivePoints.ALIGN_RIGHT,
            InteractivePoints.STATE_CONCEALED,
            () => {
                this.game.reset()

                gsap.delayedCall(2, () => {
                    // Bonfire
                    particles.visible = true
                    burn.visible = true
                    this.game.ticker.wait(2, () => {
                        particles.geometry.boundingSphere.center.y = 2
                        particles.geometry.boundingSphere.radius = 2
                    })

                    // Sound
                    this.game.audio.groups.get('campfire').items[0].positions.push(position)
                })
            },
            () => {
                this.game.inputs.interactiveButtons.addItems(['interact'])
            },
            () => {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            },
            () => {
                this.game.inputs.interactiveButtons.removeItems(['interact'])
            }
        )
    }

    setAchievement() {
        this.events.on('boundingIn', () => {
            this.game.achievements.setProgress('areas', 'landing')
        })
        this.events.on('boundingOut', () => {
            this.game.achievements.setProgress('landingLeave', 1)
        })
    }

    update() {
        this.localTime.value += this.game.ticker.deltaScaled * 0.1
    }
}