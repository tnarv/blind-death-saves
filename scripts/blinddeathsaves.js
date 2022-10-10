// Hook into chat message creation and make death saves blind
Hooks.on("preCreateChatMessage", (msg, options, userId) => {
  if (msg.data.flags && msg.data.flags.dnd5e?.roll?.type === "death") {
    const gms = ChatMessage.getWhisperRecipients("GM");
    const gmIds = gms.map((user) => user.data._id);
    const updates = {
      blind: true,
      whisper: gmIds,
    };
    msg.data.update(updates);
  }
});