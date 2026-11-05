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

            // 2. Mapeo de IDs a data-precio y formato de etiquetas visibles
            const mapIds = {
                "sp_tabla_pax": { val: precios.tabla_pax, labelFn: v => `$${v.toLocaleString('es-AR')} cada 10 personas` },
                "sp_miga_unid": { val: precios.miga_unid, labelFn: v => `Surtidos Premium - $${v.toLocaleString('es-AR')} c/u` },
                "sp_miga_especial": { val: precios.miga_especial, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_pizzetas": { val: precios.pizzetas, labelFn: v => `$${v.toLocaleString('es-AR')} c/u (Mayorista x100+)` },
                "sp_emp_carne": { val: precios.emp_carne, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_emp_pollo": { val: precios.emp_pollo, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_canas_verdura": { val: precios.canas_verdura, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_chips_jq": { val: precios.chips_jq, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_chips_pollo": { val: precios.chips_pollo, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_medialunas_jq": { val: precios.medialunas_jq, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_figa_pollo": { val: precios.figa_pollo, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_figa_rucula": { val: precios.figa_rucula, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_figa_carne": { val: precios.figa_carne, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_figa_pernil": { val: precios.figa_pernil, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_pinchos_caprese": { val: precios.pinchos_caprese, labelFn: v => `$${v.toLocaleString('es-AR')} por Pack (10 unidades)` },
                "sp_pinchos_carne": { val: precios.pinchos_carne, labelFn: v => `$${v.toLocaleString('es-AR')} por Pack (10 unidades)` },
                "sp_arrolladito_jq": { val: precios.arrolladito_jq, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` },
                "sp_arrolladito_roq": { val: precios.arrolladito_roq, labelFn: v => `$${v.toLocaleString('es-AR')} c/u` }
            };

            for (const [id, cfg] of Object.entries(mapIds)) {
                if (cfg && cfg.val !== undefined && cfg.val !== null) {
                    const numVal = parseInt(cfg.val);
                    const el = document.getElementById(id);
                    if (el) {
                        el.dataset.precio = numVal;
                    }
                    // Actualizar el texto del label visible si existe
                    const lblEl = document.getElementById(`lbl_${id}`);
                    if (lblEl && cfg.labelFn) {
                        lblEl.innerText = cfg.labelFn(numVal);
                    }
                }
            }

            // 3. Tarjetas de Perniles (Página Perniles /perniles/)
            if (precios.pernil) {
                if (precios.pernil.chico) {
                    const val = parseInt(precios.pernil.chico);
                    const lblP = document.getElementById("lbl_pernil_chico_precio");
                    if (lblP) lblP.innerText = `$${val.toLocaleString('es-AR')}`;
                    const lblS = document.getElementById("lbl_pernil_chico_sena");
                    if (lblS) lblS.innerText = `Seña 50%: $${Math.round(val / 2).toLocaleString('es-AR')} (Sin Recargo)`;
                    const lblMP = document.getElementById("lbl_pernil_chico_sena_mp");
                    if (lblMP) lblMP.innerText = `Seña Mercado Pago (+8%): $${Math.round((val / 2) * 1.08).toLocaleString('es-AR')}`;
                }
                if (precios.pernil.mediano) {
                    const val = parseInt(precios.pernil.mediano);
                    const lblP = document.getElementById("lbl_pernil_mediano_precio");
                    if (lblP) lblP.innerText = `$${val.toLocaleString('es-AR')}`;
                    const lblS = document.getElementById("lbl_pernil_mediano_sena");
                    if (lblS) lblS.innerText = `Seña 50%: $${Math.round(val / 2).toLocaleString('es-AR')} (Sin Recargo)`;
                    const lblMP = document.getElementById("lbl_pernil_mediano_sena_mp");
                    if (lblMP) lblMP.innerText = `Seña Mercado Pago (+8%): $${Math.round((val / 2) * 1.08).toLocaleString('es-AR')}`;
                }
                if (precios.pernil.grande) {
                    const val = parseInt(precios.pernil.grande);
                    const lblP = document.getElementById("lbl_pernil_grande_precio");
                    if (lblP) lblP.innerText = `$${val.toLocaleString('es-AR')}`;
                    const lblS = document.getElementById("lbl_pernil_grande_sena");
                    if (lblS) lblS.innerText = `Seña 50%: $${Math.round(val / 2).toLocaleString('es-AR')} (Sin Recargo)`;
                    const lblMP = document.getElementById("lbl_pernil_grande_sena_mp");
                    if (lblMP) lblMP.innerText = `Seña Mercado Pago (+8%): $${Math.round((val / 2) * 1.08).toLocaleString('es-AR')}`;
                }
            }

            // 4. Recalcular la cotización dinámicamente
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
