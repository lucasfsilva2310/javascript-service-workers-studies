if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service.worker.js")
    .then((res) => {
      console.log(res);
      console.log("Service worker registered successfully!");
    })
    .catch((error) =>
      console.error("Error registering Service Worker:", error)
    );
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (registrations.length > 0) {
      console.log("Service Workers ativos:", registrations);
    } else {
      console.log("Nenhum Service Worker registrado.");
    }
  });
} else {
  console.log("Service Workers não são suportados neste navegador.");
}
