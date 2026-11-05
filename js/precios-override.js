(function() {
    try {
        const stored = localStorage.getItem("eventos_precios_override");
        const precios = stored ? JSON.parse(stored) : {};

        // Exponer configuración global accesible por calcular() y los botones
        window.EVENTOS_CONFIG = {
            recargoMP: precios.recargo_mp !== undefined ? parseFloat(precios.recargo_mp) : 8,
            descuentoVolumen: precios.descuento_volumen !== undefined ? parseFloat(precios.descuento_volumen) : 10,
            umbralVolumen: precios.umbral_volumen !== undefined ? parseInt(precios.umbral_volumen) : 45,
            costoStaff: precios.costo_staff !== undefined ? parseInt(precios.costo_staff) : 25500
        };

        if (!stored) return;

        document.addEventListener("DOMContentLoaded", () => {
            const recargoMP = window.EVENTOS_CONFIG.recargoMP;

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

            // 2. Presupuesto Online (Servicios Catering con Staff)
            if (precios.srv_pizza) {
                const b = document.querySelector('.btn-servicio[data-name="Pizza Party"]');
                if (b) b.dataset.price = precios.srv_pizza;
            }
            if (precios.srv_tacos) {
                const b = document.querySelector('.btn-servicio[data-name="Tacos Party"]');
                if (b) b.dataset.price = precios.srv_tacos;
            }
            if (precios.srv_pernil) {
                const b = document.querySelector('.btn-servicio[data-name="Pernil Party Full"]');
                if (b) b.dataset.price = precios.srv_pernil;
            }
            if (precios.srv_disco) {
                const b = document.querySelector('.btn-servicio[data-name="Disco Party"]');
                if (b) b.dataset.price = precios.srv_disco;
            }

            // 3. Presupuesto Online (Adicionales)
            if (precios.adic_tabla) {
                const b = document.querySelector('.check-adicional[data-name="Tabla de Fiambres Completa"]');
                if (b) b.dataset.price = precios.adic_tabla;
            }
            if (precios.adic_pernil) {
                const b = document.querySelector('.check-adicional[data-name="Pernil Extra de Cerdo"]');
                if (b) b.dataset.price = precios.adic_pernil;
            }
            if (precios.adic_miga) {
                const b = document.querySelector('.check-adicional[data-name="Sándwiches de Miga"]');
                if (b) b.dataset.price = precios.adic_miga;
            }

            // 4. Presupuesto Online (Zonas / Envíos)
            if (precios.zona_sur) {
                const b = document.querySelector('.btn-zona[data-name*="Zona Sur"]');
                if (b) b.dataset.envio = precios.zona_sur;
            }
            if (precios.zona_caba) {
                const b = document.querySelector('.btn-zona[data-name="CABA"]');
                if (b) b.dataset.envio = precios.zona_caba;
            }
            if (precios.zona_norte) {
                const b = document.querySelector('.btn-zona[data-name="Zona Norte"]');
                if (b) b.dataset.envio = precios.zona_norte;
            }
            if (precios.zona_oeste) {
                const b = document.querySelector('.btn-zona[data-name="Zona Oeste"]');
                if (b) b.dataset.envio = precios.zona_oeste;
            }
            if (precios.zona_laplata) {
                const b = document.querySelector('.btn-zona[data-name="La Plata"]');
                if (b) b.dataset.envio = precios.zona_laplata;
            }

            // 5. Mapeo de IDs a data-precio e inputs en Armá tu Combo
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
                    const lblEl = document.getElementById(`lbl_${id}`);
                    if (lblEl && cfg.labelFn) {
                        lblEl.innerText = cfg.labelFn(numVal);
                    }
                }
            }

            // 6. Tarjetas de Perniles (/perniles/)
            if (precios.pernil) {
                const factorMP = 1 + (recargoMP / 100);
                if (precios.pernil.chico) {
                    const val = parseInt(precios.pernil.chico);
                    const lblP = document.getElementById("lbl_pernil_chico_precio");
                    if (lblP) lblP.innerText = `$${val.toLocaleString('es-AR')}`;
                    const lblS = document.getElementById("lbl_pernil_chico_sena");
                    if (lblS) lblS.innerText = `Seña 50%: $${Math.round(val / 2).toLocaleString('es-AR')} (Sin Recargo)`;
                    const lblMP = document.getElementById("lbl_pernil_chico_sena_mp");
                    if (lblMP) lblMP.innerText = `Seña Mercado Pago (+${recargoMP}%): $${Math.round((val / 2) * factorMP).toLocaleString('es-AR')}`;
                }
                if (precios.pernil.mediano) {
                    const val = parseInt(precios.pernil.mediano);
                    const lblP = document.getElementById("lbl_pernil_mediano_precio");
                    if (lblP) lblP.innerText = `$${val.toLocaleString('es-AR')}`;
                    const lblS = document.getElementById("lbl_pernil_mediano_sena");
                    if (lblS) lblS.innerText = `Seña 50%: $${Math.round(val / 2).toLocaleString('es-AR')} (Sin Recargo)`;
                    const lblMP = document.getElementById("lbl_pernil_mediano_sena_mp");
                    if (lblMP) lblMP.innerText = `Seña Mercado Pago (+${recargoMP}%): $${Math.round((val / 2) * factorMP).toLocaleString('es-AR')}`;
                }
                if (precios.pernil.grande) {
                    const val = parseInt(precios.pernil.grande);
                    const lblP = document.getElementById("lbl_pernil_grande_precio");
                    if (lblP) lblP.innerText = `$${val.toLocaleString('es-AR')}`;
                    const lblS = document.getElementById("lbl_pernil_grande_sena");
                    if (lblS) lblS.innerText = `Seña 50%: $${Math.round(val / 2).toLocaleString('es-AR')} (Sin Recargo)`;
                    const lblMP = document.getElementById("lbl_pernil_grande_sena_mp");
                    if (lblMP) lblMP.innerText = `Seña Mercado Pago (+${recargoMP}%): $${Math.round((val / 2) * factorMP).toLocaleString('es-AR')}`;
                }
            }

            // 7. Recalcular la cotización dinámicamente
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
