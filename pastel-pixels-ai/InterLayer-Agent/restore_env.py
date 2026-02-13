content = """BROWSER_USE_API_KEY=bu_kw0GnmrntZPm0VupPoG016Vr4WfBlnNG3_RVow9ho3Q
TAVUS_API_KEY=df512a650a95471c816b4d813d9bbcf8
TAVUS_REPLICA_ID=r6ae5b6efc9d
TAVUS_PERSONA_ID=pb50642aade9
"""
with open(".env", "w") as f:
    f.write(content)
print("Restored .env")
