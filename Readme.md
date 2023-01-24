# O projekcie

Projekt to bardzo prosta strona służąca do „zarządzania lodówką”. Za jej pomocą możemy kontrolować jakie artykuły spożywcze znajdują się w naszej lodówce, do kiedy mają termin przydatności do spożycia itd…   # Przygotowanie do pierwszego uruchomienia

### Wymagania

Aby uruchomić projekt koniecznie jest posiadanie zainstalowanego środowiska `Node.js` oraz `mysql`.

### Baza danych

Aby możliwe było poprawne funkcjonowanie projektu konieczne jest utworzenie bazy danych o nazwie `freedgedb`. Konieczne może okazać się wprowadzenie hasła dla użytkownika `root` mysql wewnątrz `/backend/config/config.json`. Tworzenie tabel wewnątrz utworzonej bazy danych nie jest wymagane, ponieważ program zrobi to za nas. 
### Backend
 Kolejno przejdź do katalogu `/backend` w którym zainstaluj wymagane pakiety za pomocą komendy:

```bash
npm install
```

Po zainstalowaniu pakietów użyj komendy :

```bash
npm start
```

### Frontend

W analogiczny sposób należy postąpić w katalogu `/frontend`. Aby zainstalować wymagane pakiety użyj komendy:

```bash
npm install
```

Po zainstalowaniu pakietów użyj komendy :

```bash
npm start
```
