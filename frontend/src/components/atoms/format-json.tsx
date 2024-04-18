import React from "react"

const formatJson = (json: any, indent = 0, isFullDisplay = false) => {
    return Object.entries(json).map(([key, value], index) => {
        if (!isFullDisplay && index >= 3) return null

        let displayValue: React.ReactNode
        if (typeof value === "object" && value !== null) {
            displayValue = (
                <div style={{ marginLeft: "20px" }}>
                    {formatJson(value, indent + 1, isFullDisplay)}
                </div>
            )
        } else {
            displayValue = typeof value === "string" ? `"${value}"` : JSON.stringify(value)
        }

        return (
            <div
                key={key}
                style={{
                    marginLeft: `${indent * 5}px`,
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                }}
            >
                <span style={{ color: "#D23403" }}>
                    <strong>{key}</strong>
                </span>
                :<span style={{ color: "black" }}>{displayValue}</span>
            </div>
        )
    })
}

export default formatJson
