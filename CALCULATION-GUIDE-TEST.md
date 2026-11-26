# BreakerSettings TEST beregningsregler

Denne reference beskriver den implementerede TEST-logik i `app-test.js`. Den er ikke en erstatning for producentens relæmanualer; datasættet må kun indeholde producentverificerede indstillingstrin.

## Inputinitialisering

- `desired` og `inc` initialiseres til den valgte relæs faktiske `In`.
- Initialisering sker ved første render og når `rating()` ændrer værdi.
- Manuelle `desired`- og `inc`-værdier bevares, når `In` er uændret, herunder ved ændringer af Ik min., Ik max., poler, metode og RCD.
- `inc` indgår alene som manuel dokumentationsværdi. Den bruges ikke til valget af Ir, Isd, Ii eller Im.

## Overlastvalg

`best(bases, factors, desired)` afprøver alle gyldige kombinationer:

1. `base` er en dokumenteret Io-position, eller `In` uden Io.
2. `value = base * factor` normaliseres til tre decimaler.
3. Kandidater over `desired` fravælges.
4. Mindste differens `desired - value` vælges.
5. Ved samme resultat vælges faktor nærmest `1`; derefter grovindstilling nærmest ønsket strøm og til sidst den lavere grovindstilling.
6. Hvis ingen kandidat ligger ved eller under ønsket strøm, returneres en fejl med lavest mulige værdi.

`bestFineIr` gælder kun relæer med dokumenteret elektronisk finjustering. Den lader drejeknappen sætte det dokumenterede maksimum og gennemløber de dokumenterede A-trin op til både drejeknappens værdi og ønsket strøm.

`Calculated settings` kan for MicroLogic-serier med flere dokumenterede indstillingstyper vælge en alternativ type, hvis dens beregnede Ir kommer tættere på ønsket strøm end standardtypen. `Minimum settings` begrænser dette til standardtypen. Metoden ændrer ikke den generelle kandidatberegning for andre relæer.

## Tid og kortslutning

- `choiceValue` vælger laveste numeriske tr-værdi eller bevarer et gyldigt manuelt valg.
- `renderTsdControls` gør det samme for justerbare tsd-optioner. Tekniske faste korttidskarakteristikker er ikke tsd-indstillinger og vises ikke i tabel, resultat eller Kopiér-output.
- `under(factors, base, limit)` vælger den højeste dokumenterede faktor, hvor `factor * base <= limit`.
- Isd anvender normalt `base = faktisk Ir`; `isdBase: "In"` anvender `base = In`.
- Isd-grænse: `Ik min * 1000 * 0,8`.
- Justerbar Ii anvender `Ik max * 1000 * 0,8`, når Isd/I2 er aktiv, ellers `Ik min * 1000 * 0,8`.
- Faste Ii/I3/Im-data vises som teknisk producentinformation og beregnes ikke om.

## Producentetiketter

- ABB: `I1`, `t1`, `I2`, `t2`, `I3`.
- Schneider og Siemens beholder deres etablerede etiketter.
- Faste tider og korttidskarakteristik er ikke brugerindstillinger, selv om de vises i resultatet.

## ABB Tmax XT Ekip Dip

ABB SACE Tmax XT IEC, dokument `1SDC210100D0206`, revision 08/2024, side 3/23 og 3/25, opdeler Ekip Dip i separate fysiske relætyper. TEST-data modellerer derfor `Ekip Dip LS/I`, `Ekip Dip LSI`, `Ekip Dip LIG` og `Ekip Dip LSIG` hver for sig.

- LS/I og LIG: `I1 = 0,4...1,0 x In` i trin på `0,04 x In`; `t1 = 12/36 s` og `12/48 s` på XT7.
- LSI og LSIG: `I1 = 0,4...1,0 x In` i trin på `0,02 x In` for XT2-XT6; XT7 bruger ABBs dokumenterede, særskilte værdiliste. `t1`, `I2`, `t2` og `I3` følger hver types dokumenterede frame-tabel.
- I2 for LS/I, LSI og LSIG bruger `isdBase: "In"`: `I2 = faktor x In`. Den bruger ikke valgt I1 som reference.
- LIG har L/I/G, men ikke den dokumenterede selektive S-funktion i denne model; TEST viser derfor hverken I2 eller t2 for LIG.
- Ekip Dip-indstillingerne er fysiske DIP-switch-positioner. Resultat og Kopiér-output skriver derfor eksempelvis `I1: 0,68 x In = 272 A` og `I2: 7 x In = 2800 A`.
- Når valgt LS/I giver en lavere fysisk I1 end ønsket, undersøger `ekipDipAlternativeSuggestion` kun dokumenteret kompatibel LSI med samme frame, In, poltal og nødvendige L/S/I-funktioner. Den viser et informativt forslag, men ændrer aldrig valgt relæ.
- Ekip Dip LS/I har en fysisk S/I DIP-switch. TEST kræver teknikervalget: `S` viser og dokumenterer I2/t2, mens `I` viser og dokumenterer I3. Før valget dokumenteres ingen af dem, og I2/t2 og I3 kan aldrig være aktive samtidig.
- Ekip Dip LIG og LSIG har separat G-jordfejlsbeskyttelse, ikke RCD. I4 vælges manuelt mellem `OFF` og producentens dokumenterede faktorer; når I4 er aktiv, vælges t4 manuelt. XT2-XT6 bruger I4 = 0,20/0,25/0,45/0,55/0,75/0,80/1,00 x In. XT7 bruger 0,20/0,30/0,40/0,60/0,80/0,90/1,00 x In for LIG og 0,10/0,20/0,30/0,40/0,60/0,80/0,90/1,00 x In for LSIG. t4 er 0,1/0,2/0,4/0,8 s; XT7 tilbyder desuden den dokumenterede t=k/I²-kurve.
- ABBs samme tabel dokumenterer `OFF` for I2 og I3. TEST viser OFF som fysisk DIP-valg for Ekip Dip-typerne og beholder den Ik-baserede automatiske beregning som standard for en aktiv beskyttelse. Manuelle numeriske I2/I3-valg filtreres til dokumenterede trin, der overholder den eksisterende Ik-grænse. I2 OFF skjuler t2.
- Når I2 er OFF og I3 er aktiv, beregnes I3 mod `Ik min * 1000 * 0,8`; er både I2 og I3 aktive, bevares I3 mod `Ik max * 1000 * 0,8`. OFF har prioritet over AUTO-fejl og dokumenteres som OFF. Er begge kortslutningsfunktioner OFF eller inaktive, vises en advarsel om manglende aktiv kortslutningsbeskyttelse.
- `Kopiér` er spærret, når den fysiske indstilling er ufuldstændig eller ugyldig: LS/I uden S/I-valg, LIG/LSIG uden I4-valg eller aktiv I4 uden t4, aktiv I2/I3 AUTO uden gyldigt producenttrin eller ingen aktiv kortslutningsbeskyttelse. I4 OFF er komplet. `resetDipSelections()` nulstiller S/I, I2, I3, I4 og t4 ved frame-, relæ- og ratingskift, så valg ikke arves af en anden fysisk variant.

Eksempel: XT5, In 400 A, ønsket 280 A giver LS/I `I1 = 0,68 x In = 272 A`, mens LSI kan bruge `I1 = 0,70 x In = 280 A`.

## Kontroleksempel

NSX100, MicroLogic 2.2, In 100 A, ønsket 55 A:

- Dokumenteret Io-position 55 A og Ir-faktor 1,00 giver det præcise match 55 A.
- Ved Ik min 9 kA er Isd-grænsen 7.200 A.
- Dokumenteret Isd 10 x Ir giver 550 A og er derfor gyldig.
- `tr` er fast 16 s ved 6 x Ir; den vises ikke som dropdown. MicroLogic 2's 20/80 ms-korttidsadfærd er kun en ikke-justerbar teknisk karakteristik og vises ikke som tsd.
