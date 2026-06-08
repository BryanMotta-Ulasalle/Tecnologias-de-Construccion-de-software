self.onmessage = (event) => {
  try {
    const csvText = event.data;

    const start = Date.now();

    while (Date.now() - start < 5000) {
      Math.sqrt(Math.random() * 1000);
    }

    const rows = csvText
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    self.postMessage({
      success: true,
      data: rows,
    });
  } catch (error) {
    self.postMessage({
      success: false,
      error: error.message,
    });
  }
};
