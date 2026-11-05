(function() {
    try {
        const stored = localStorage.getItem("eventos_precios_override");
        if (!stored) return;

        const precios = JSON.parse(stored);

        document.addEventListener("DOMContentLoaded", () => {
            // 1. Perniles en select (Armá tu combo)
            const spPernilSelect = document.getElementById("sp_pernil_tipo");
            if (spPernilSelect && precios.pernil) {
                if (spPernilSelect.options[1] && precios.pernil.chico) {
                    spPernilSelect.options[1].value = precios.pernil.chico;
                    spPernilSelect.options[1].text = `Pernil CHICO - $${parseInt(precios.pernil.chico).toLocaleString('es-AR')} (Rinde ~10-15 pers. / 50 figazas)`;
                }
                if (spPernilSelect.options[2] && precios.pernil.mediano) {
                    spPernilSelect.options[2].value = precios.pernil.mediano;
                    spPernilSelect.options[2].text = `Pernil MEDIANO - $${parseInt(precios.pernil.mediano).toLocaleString('es-AR')} (Rinde ~20-25 pers. / 100 figazas)`;
                }
                if (spPernilSelect.options[3] && precios.pernil.grande) {
                    spPernilSelect.options[3].value = precios.pernil.grande;
                    spPernilSelect.options[3].text = `Pernil GRANDE - $${parseInt(precios.pernil.grande).toLocaleString('es-AR')} (Rinde ~30-35 pers. / 150 figazas)`;
                }
            }

            // 2. Mapeo de IDs a data-precio
            const mapIds = {
                "sp_miga_especial": precios.miga_especial,
                "sp_pizzetas": precios.pizzetas,
                "sp_emp_carne": precios.emp_carne,
                "sp_emp_pollo": precios.emp_pollo,
                "sp_canas_verdura": precios.canas_verdura,
                "sp_chips_jq": precios.chips_jq,
                "sp_chips_pollo": precios.chips_pollo,
                "sp_medialunas_jq": precios.medialunas_jq,
                "sp_figa_pollo": precios.figa_pollo,
                "sp_figa_rucula": precios.figa_rucula,
                "sp_figa_carne": precios.figa_carne,
                "sp_figa_pernil": precios.figa_pernil,
                "sp_pinchos_caprese": precios.pinchos_caprese,
                "sp_pinchos_carne": precios.pinchos_carne,
                "sp_arrolladito_jq": precios.arrolladito_jq,
                "sp_arrolladito_roq": precios.arrolladito_roq
            };

            for (const [id, val] of Object.entries(mapIds)) {
                if (val !== undefined && val !== null) {
                    const el = document.getElementById(id);
                    if (el) {
                        el.dataset.precio = val;
                    }
                }
            }

            // 3. Recalcular si existe la función
            if (typeof calcular === "function") {
                calcular();
            }
            if (typeof calcularPrecio === "function") {
                calcularPrecio();
            }
        });
    } catch (e) {
        console.error("Error aplicando precios dinámicos:", e);
    }
})();
