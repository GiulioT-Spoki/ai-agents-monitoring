# 56588 — Agents / X0 - Credenziali — runtime flow (internal)

Solid = già nel prompt (sezione citata). `da_scrivere` = consigliato, non ancora scritto.

Aggiornato v2 2026-08-31: `get_current_datetime` e le chiusure anomale sono ora nel prompt (non più `da_scrivere`); restano fuori silenzio/rumore e `transfer_to_human`.

```mermaid
flowchart TD
  call[Chiamata_inbound]
  login[xLogin]
  loginOk{ok_true_e_token}
  loginFail[Comunica_errore_e_stop]
  say[Login_ok]
  targa[Targa]
  targaOk{Formato_2L_3N_2L}
  dtTool[get_current_datetime]
  data[Data_evento]
  dataOk{Oggi_o_passata}
  cell[Cellulare_9_13_cifre]
  email[Email]
  privacy{Consenso_privacy}
  privacyNo[Non_posso_procedere]
  recap[Riepilogo_una_volta]
  conferma{Conferma_utente}
  verifica[xVerificaDuplicato]
  esito{Body_verifica}
  resume[Resume_pratica_riprendibile]
  blocked[Pratica_in_lavorazione]
  errore[Errore_HTTP_400]
  crea[xCreaPratica]
  idOk{value_idIncarico_numerico}
  idNo[Id_non_leggibile]
  rif[Pratica_creata_riferimento_cifre]
  retry{Secondo_tentativo_dato}
  anomala[CHIUSURE_ANOMALE]
  done[STEP_COMPLETATO]
  silenzio[Silenzio_o_rumore_da_scrivere]
  transfer[transfer_to_human_da_scrivere]

  call --> login --> loginOk
  loginOk -->|no| loginFail --> anomala
  loginOk -->|si| say --> targa --> targaOk
  targaOk -->|no| retry
  targaOk -->|si| data
  dtTool --> data
  data --> dataOk
  dataOk -->|futura| retry
  dataOk -->|ok| cell --> email --> privacy
  retry -->|dato_ottenuto| data
  retry -->|ancora_invalido| anomala
  privacy -->|no| privacyNo --> anomala
  privacy -->|si| recap --> conferma
  conferma -->|si| verifica --> esito
  esito -->|Incarico_presente_stato_1_2_4| resume --> done
  esito -->|Incarico_presente_altro_stato| blocked --> done
  esito -->|HTTP_400| errore --> anomala
  esito -->|Nessun_incarico| crea --> idOk
  idOk -->|no| idNo --> anomala
  idOk -->|si| rif --> done
  silenzio --> transfer
```

- Tool nel prompt: `xLogin`, `get_current_datetime`, `xVerificaDuplicato`, `xCreaPratica`
- `da_scrivere`: gestione silenzio-rumore, `transfer_to_human`
- Due uscite: `STEP_COMPLETATO` (successo → prossimo agente) e `CHIUSURE_ANOMALE` (pratica non aperta, chiamata chiusa)
