interface Emoji {
    codePoint: string,
    commonLocalDataRepository_shortName: string,
    shortCode: string
}

const basicEmoji: Emoji[] = [];

fetch("emoji-sequences.txt")
.then(response => response.text())
.then(data => {
    const sections = data.split("# ================================================");

    const basicEmojiSection = sections[1];

    const basicEmojiSectionLines = basicEmojiSection.split(/\r?\n/);

    const linesWithoutHeaderAndFooter = basicEmojiSectionLines.slice(4, -4);

    linesWithoutHeaderAndFooter.forEach((line) => {
        const lineSlices = line.split(/[;,#]/);

        const codePoint = lineSlices[0].trim().split(/[..]/)[0];
        const shortName = lineSlices[2].trim();
        const shortCode = ":" + shortName.replace(" ", "_") + ":"

        basicEmoji.push({
            codePoint,
            commonLocalDataRepository_shortName: shortName,
            shortCode
        })
    });
});

export default basicEmoji;