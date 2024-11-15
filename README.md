# PlanBot 

# Opis projekta
Ovaj projekt je rezultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Aplikacija je osmišljena za organiziranje grupnih događaja (online ili uživo). Pri tome dopušta više 
sudionika da glasaju o detaljima događaja (vrijeme i mjesto događanja). Platforma će također 
sadržavati integraciju kalendara (npr. s Google kalendarom) za sinkronizaciju događaja s osobnim 
kalendarima.

# Funkcionalnosti
- Event Creation: 
  - Korisnici predlažu događaje (event) u obliku objave; upisuju ime događaja, opis, predlažu vrijeme i mjesto događaja
  - Kreator objave može označiti objavu kao javnu (bilo tko se može pridružiti) ili privatnu (samo određene osobe mogu vidjeti objavu) 
  - Kreator može dopustiti mogućnost predlaganja novog mjesta i/ili vrijeme događaja
    
- Event Finalization: 
  - Kreator može svoju objavu označiti kao finalnu; određuje finalno vrijeme i mjesto 
događaja; događaj postaje dio budućih dogadaja (upcoming events); korisnici koji 
su objavu označili sa “attend” program premještava tu objavu na njihovu privatnu 
ploču (event dashboard)

- Collaborative Scheduling: 
    - Korisnici na pojedinim objavama imaju mogućnost predložiti neko drugo vrijeme ili 
mjesto (ako je za danu objavu takva mogućnost dopustena od strane kreatora) 
  - Korisnici mogu reagirati na predloženo vrijeme i/ili mjesto događanja što kreatoru 
kasnije pomaže u odabiru konačnog mjesta i vrijeme događaja 
  - Sustav ujedno i daje prijedloge za vrijeme i mjesto događaja na temelju privatnih 
kalendara svih sudionika 
  - Korisnici mogu na objavu ostaviti običan komentar 
  - Objavu mogu označiti sa “attend” ili “won’t attend” 

- Calendar Integration: 
  - Integracija programa s Google Calendar API-jem omogućuje korisnicima pregled 
slobodnih termina u kalendaru te moguce preklapanja dogadaja 
  - Kada je događaj finaliziran, može se dodati u osobni kalendar sudionika jednim 
klikom 

- Reminders & Notifications: 
  - Korisnici su obaviješteni notifikacijama ili emailom o novoj objavi ili finalizaciji neke 
objave

- Event Dashboard: 
  - Na privatnoj ploči korisnici mogu vidjeti nadolazeće događaje koje su označili sa “attend” 
  - Detalji događaja 
  - Opcija pretraživanja
 
- Real-Time Collaboration: 
  - Nakon što je događaj potvrđen od strane kreatora, tada se premještava među buduće događaje (upcoming events) 
  - Korisnici mogu nastaviti komentirati na određenu objavu 
  - Mogu podijeliti poveznice, detalje, karte…
 
- User Management: 
  - Autentifikacija korisnika (prijava/registracija) pomoću e-pošte. 
  - Mogu mijenjati postavke - svoj profil, podatke o sebi, vrijeme kada nisu dostupni tijekom tjedna

# Rad na projektu

- Discord za komunikaciju
- GitHub za kolaborativni rad na kodu
- Lucidchart za kreiranje UML dijagrama 
- Visual Paradigm kao alat za razvoj CASE
- dokumentacija projekta preko Wiki stranice
- Java kao programski jezik uz objektni pristup
- Spring Boot za razvoj poslužiteljske strane aplikacija (backend)
- ReactJS za razvoj korisničkog sučelja (frontend)
- PostgreSQL baza podataka
- Deployment: Render, Docker i Amazon AWS

# Članovi tima 
- Nina Karavanić
- Toma Begović
- Lea Gojšić
- Ema Mamić
- Borna Maričak
- Josip Galić

  # Deploy
  https://planbot-9s64.onrender.com/
  primjer logina:
  username: ana
  password: anapassword 
