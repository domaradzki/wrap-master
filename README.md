## Intro

Aplikacja do zarzadania zamówieniami z programu Insert.
Głowne funkcje to

1. Przekazywanie zamówień jako zlecenie na produkcję;
2. Zlecanie wysyłki gotowych towarów do magazynu;
3. Obliczanie prowizji handlowca.
4. Raporty sprzedaży
5. Raporty produkcji

### Dashboard

- Aplikacja bazuje na zamówieniach od klienta wprowadzonych w programie Gestor/Subiekt firmy Insert.
- Wysyła zapytanie do bazy danych na serwerze z programem i wyświetla gotowe zamówienia do interakcji z handlowcem.
- Zalogowany handlowiece rozdysponowuje swoje zlecenia na trasport oraz produkcję.
- Dodane zamówienia zapisane są lokalnie w bazie danych MongoDB
- Zamówienie zleceone na produkcję widnieją w zależności od rodzaju towaru: w zakładce Produkcja Nadruk lub zakładce Produkcja Folia
- Zamówienia gotowe do wysyłki widnieją w zakłądce Transport
- Zamówienia w zakładce handlowca posiadają daty rezlizacji, płatności i status

Po wykonianiu działania produkcja/wysyłka zamówienie zmieni status i będzie widoczne w zakładce Zlecone/Wysyłka

### Widok Produkcja

Pracownicy produkcyjni i magazynowi będą posiadać swój dostęp z widokiem na zamówienia zlecone TPD, zlecone FS i wysyłkowe.
Zamówienia będą mieć :

- możliwość potwierdzenia terminu realizacji
- możliwość potwierdzenia zrealizowani zamówienia
- możliwość przesunięcia do wysyłki
- filtrowanie po terminach realizacji

### Widok Prowizje (Handlowiec)

Handlowiec ma obiliczaną prowicje na podstawie zamówień i ustalonych pozimów marży.
Wypłata marży powiązana jest z ustawionym targetem.
Wyliczenie prowizji na m-c i kwartał.

### Widok Administracja

Dostęp dla kadry zarządzającej, widok wszystkich zamówień. Widok raportów sprzedaży m-c, kwartał, rok.

### Przykładowy scenariusz

1. Logowanie handlowca i wejście w widok nowe zamówienia
2. Ustawienie poziomu prowizji
3. Zlecenie produkcyjne na TPD i ustawienie priorytetu 8dni.
4. Produkcja potwierdza termin za 8 dni.
5. Produkcja zaznacza zrealizowanie zlecenia i gotowe do wysyłki.
6. Pakowacz w zakładce wysyłka widzi zlecenie do spakowania
7. Po wysłaniu zmienia status na wysłane.
