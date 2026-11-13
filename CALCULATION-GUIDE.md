# BreakerSettings beregningsregler

Denne reference beskriver den implementerede logik i `app.js`. Producentens dokumenterede indstillingstrin er datagrundlaget.

## Input

- `desired` og `inc` initialiseres til relæets faktiske `In` ved første render og ved et reelt In-skift.
- Manuelle værdier bevares ved ændringer uden In-skift.
- `inc` er en manuel dokumentationsværdi og indgår ikke i valget af Ir, Isd, Ii eller Im.

## Overlast

`best(bases, factors, desired)` afprøver alle dokumenterede Io/Ir-kombinationer. Kandidater over `desired` fravælges. Den højeste resterende værdi vælges; ved lighed foretrækkes faktor nærmest 1 og derefter nærmeste grovindstilling. Mangler en mulig værdi, vises lavest mulige værdi som fejl.

`bestFineIr` bruges kun ved dokumenteret elektronisk finjustering og afprøver de dokumenterede A-trin op til både drejeknappens maksimum og ønsket strøm.

## Tid og kortslutning

- Justerbare tr og tsd bruger kun dokumenterede valg; laveste gyldige trin vælges først.
- Faste karakteristikker er tekniske oplysninger, ikke justerbare relæindstillinger.
- `under(factors, base, limit)` vælger højeste faktor hvor `factor * base <= limit`.
- Isd-grænse er `Ik min * 1000 * 0,8`; Isd refererer normalt til faktisk Ir, eller In for data med `isdBase: "In"`.
- Justerbar Ii bruger `Ik max * 1000 * 0,8`, når Isd findes, ellers `Ik min * 1000 * 0,8`.
- MicroLogic 2's 20/80 ms-korttidsadfærd er ikke-justerbar og vises ikke som tsd.

## Producentetiketter

- ABB: `I1`, `t1`, `I2`, `t2`, `I3`.
- Schneider og Siemens beholder etablerede producentetiketter.
