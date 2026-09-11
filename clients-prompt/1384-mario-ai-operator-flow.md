# 1384 — Mario AI Operator — runtime flow (internal)

Solid = already in the prompt (cite the section). `da_scrivere` = advised, not written yet.

```mermaid
flowchart TD
  msg[Messaggio]
  greet{Saluto_senza_domanda}
  askHelp[Chiedi_come_aiutare]
  intent{Intent}
  faq[search_spoki_manual]
  results{result_count}
  allow{Tipo_how_to}
  twoSpoki[Manuale_e_In_piattaforma]
  twoMeta[Manuale_e_Meta]
  oneDoc[Solo_url_for_lang]
  oneApp[Solo_path_app]
  oneMeta[Solo_url_Meta]
  tech{Problematica_tecnica_Spoki}
  gap[Gap_resta_in_chat]
  assistenza[Link_app_spoki_support]
  ticketAmb{Ticket_ambiguo}
  ticketUI[app_spoki_tickets]
  metaSupport[facebook_business_support_home]
  dashboard[app_spoki_dashboard]
  plans[app_spoki_plans_no_euro]
  prospect{Segnale_prospect}
  askProspect[Una_domanda_no_link]
  demo[book_a_demo_it_es_en]
  transfer[transfer_to_human]
  datetime[get_current_datetime]

  msg --> greet
  greet -->|Si| askHelp
  greet -->|No| intent
  intent -->|FAQ_prodotto| faq
  intent -->|Commerciale_o_attivazione| prospect
  intent -->|Sconto_senza_dire_prospect| gap
  intent -->|Ticket_ambiguo| ticketAmb
  intent -->|CTA_Apri_Ticket_Supporto| assistenza
  intent -->|Ticket_suo_cliente_gia_chiaro| ticketUI
  intent -->|Ticket_verso_Meta_gia_chiaro| metaSupport
  intent -->|Problema_tecnico_Spoki| tech
  intent -->|Operatore_esplicito| transfer
  intent -->|Fallo_tu_sul_account| dashboard
  intent -->|Piano_upgrade_cliente| plans
  intent -->|Commerciale_dopo_how_to_cliente| plans
  intent -->|Procedura_temporale| datetime
  datetime --> faq
  faq --> results
  results -->|Ha_text| allow
  results -->|Vuoto_o_fail| tech
  allow -->|How_to_schermata_Spoki| twoSpoki
  allow -->|How_to_step_Meta| twoMeta
  allow -->|Nessuna_schermata| oneDoc
  allow -->|Solo_apri_Spoki| oneApp
  allow -->|Solo_apri_Meta| oneMeta
  tech -->|Si| assistenza
  tech -->|No| gap
  ticketAmb -->|Assistenza_tecnica| assistenza
  ticketAmb -->|Ticket_suo_cliente| ticketUI
  ticketUI --> faq
  prospect -->|Gia_esplicito_no_piano| demo
  prospect -->|Incerto| askProspect
  askProspect -->|Conferma_prospect| demo
  askProspect -->|Ha_account| plans
```

- Solid: Ruolo, Obiettivo, Lingua, Tools, Flusso (CTA ticket → support; commerciale dopo how-to → /plans), Disambiguazione ticket, Assistenza, Ticket, allowlist, Prospect, Limiti (no nessi metriche inventati), Tono, Esempi
- Nessun `da_scrivere`
- Mai tre URL; mai `In piattaforma:` + `Meta:`; mai support o how-to + book-a-demo
