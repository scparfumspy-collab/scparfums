// js/render.js
function renderTarjeta(perfume, precios, ofertas) {
  const precioData = precios.find(pr => pr.id === perfume.id);
  const precioNormal = precioData ? precioData.precio : null;
  const ofertaData = ofertas.find(o => o.id === perfume.id);

  let precioFinal = precioNormal;
  let descuento = null;

  if (precioNormal && ofertaData) {
    descuento = ofertaData.descuento;
    precioFinal = Math.round(precioNormal * (1 - descuento / 100));
  }

  const tarjeta = document.createElement('div');
  tarjeta.className = 'perfume-card';
  tarjeta.setAttribute('data-marca', perfume.marca);

  if (ofertaData && precioNormal) {
    tarjeta.classList.add("en-oferta");
    tarjeta.setAttribute("data-descuento", `-${descuento}%`);
  }

  let html = `
    <a href="../${perfume.pagina}">
      <img src="../${perfume.imagen}" alt="${perfume.nombre}">
      <p><strong>${perfume.marca}</strong> - ${perfume.nombre}</p>
  `;

  if (ofertaData && precioNormal) {
    html += `
      <p class="precio-oferta">₲ ${precioFinal.toLocaleString("es-PY")}</p>
      <p class="precio-normal"><s>₲ ${precioNormal.toLocaleString("es-PY")}</s></p>
    `;
  } else if (precioNormal) {
    html += `<p class="precio">₲ ${precioNormal.toLocaleString("es-PY")}</p>`;
  } else {
    html += `<p class="precio">Consultar</p>`;
  }

  html += `</a>`;
  tarjeta.innerHTML = html;
  return tarjeta;
}
