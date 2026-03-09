<script>
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const suggestionsBox = document.getElementById("searchSuggestions");
  let perfumesCache = [];

  // Cargar perfumes.json una sola vez
  fetch("data/perfumes.json")
    .then(resp => resp.json())
    .then(data => { perfumesCache = data; })
    .catch(err => console.error("Error cargando perfumes:", err));

  // Autocompletado
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    suggestionsBox.innerHTML = "";
    if (!query) {
      suggestionsBox.style.display = "none";
      return;
    }

    const resultados = perfumesCache.filter(p =>
      p.nombre.toLowerCase().includes(query) ||
      p.marca.toLowerCase().includes(query)
    ).slice(0, 10);

    if (resultados.length === 0) {
      suggestionsBox.style.display = "none";
      return;
    }

    resultados.forEach(perfume => {
      const item = document.createElement("div");
      item.textContent = perfume.marca + " - " + perfume.nombre;
      item.addEventListener("click", () => {
        window.location.href = "/scparfums/" + perfume.pagina;
      });
      suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = "block";
  });

  // Botón Buscar → redirige a buscar.html
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      window.location.href = "/scparfums/buscar.html?q=" + encodeURIComponent(query);
    }
  });

  // Ocultar sugerencias si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.style.display = "none";
    }
  });
});
</script>
