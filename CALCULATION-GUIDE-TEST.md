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
- Justerbar Ii anvender `Ik max * 1000 * 0,8`, når Isd findes, ellers `Ik min * 1000 * 0,8`.
- Faste Ii/I3/Im-data vises som teknisk producentinformation og beregnes ikke om.

## Producentetiketter

- ABB: `I1`, `t1`, `I2`, `t2`, `I3`.
- Schneider og Siemens beholder deres etablerede etiketter.
- Faste tider og korttidskarakteristik er ikke brugerindstillinger, selv om de vises i resultatet.

## Kontroleksempel

NSX100, MicroLogic 2.2, In 100 A, ønsket 55 A:

- Dokumenteret Io-position 55 A og Ir-faktor 1,00 giver det præcise match 55 A.
- Ved Ik min 9 kA er Isd-grænsen 7.200 A.
- Dokumenteret Isd 10 x Ir giver 550 A og er derfor gyldig.
- `tr` er fast 16 s ved 6 x Ir; den vises ikke som dropdown. MicroLogic 2's 20/80 ms-korttidsadfærd er kun en ikke-justerbar teknisk karakteristik og vises ikke som tsd.
