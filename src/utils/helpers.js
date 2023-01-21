export const sortMessages = (messages) => {
    return messages.sort((msg1, msg2) => {
      if (msg1.timestamp < msg2.timestamp) {
        return 1;
      } else if (msg1.timestamp > msg2.timestamp) {
        return -1;
      } else {
        return 0;
      }
    })
  }