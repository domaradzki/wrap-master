// utils/mssql.ts

import { ConnectionPool } from "mssql";

const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER || "",
  database: process.env.MSSQL_DATABASE,
  port: 58857,
  connectionTimeout: 10000,
  options: {
    //   encrypt: true,
    trustServerCertificate: true,
  },
};

export const fetchDataFromMSSQL = async () => {
  const pool = new ConnectionPool(config);

  try {
    await pool.connect();
    const result = await pool.request().query(`
               SELECT 
    d.id AS documentId,
    d.DataWprowadzenia AS dateInsert,
    d.NumerWewnetrzny_PelnaSygnatura AS signature,
    d.Symbol AS symbol,
    d.Uwagi AS details,
    d.Zamkniety AS closed,
    d.StatusDokumentuId AS documentStatus,
    podmiot.Nazwa AS client,
    podmiot.Id AS companyId,
    uzytkownicy.Login AS trader,
    adres.LiniaCalosc AS deliveryAddress,
    waluta.Symbol AS currency,
    kurs.Kurs AS exchangeRate,
    STRING_AGG(pozycje.Ilosc, ', ') AS quantities,
    STRING_AGG(pozycje.Cena_NettoPoRabacie, ', ') AS prices,
    STRING_AGG(pozycje.Wartosc_NettoPoRabacie, ', ') AS netValues,
    STRING_AGG(pozycje.NumerReferencyjny, ', ') AS itemIds,
    STRING_AGG(asortyment.Symbol, ', ') AS codes,
    STRING_AGG(asortyment.Nazwa, ', ') AS assortments,
    STRING_AGG(miary.Symbol, ', ') AS units,
    STRING_AGG(grupa.Nazwa, ', ') AS types,
    STRING_AGG(rodzaj.Symbol, ', ') AS kinds,
    STRING_AGG(faktura.DokumentyRealizujace_Id, ', ') AS numberOfDocumentInvoices
FROM 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[Dokumenty] d 
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[PodmiotHistorie] podmiot ON d.PodmiotWybranyId = podmiot.Id 
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[AdresHistorie] adres ON d.MiejsceDostawyId = adres.Id OR d.MiejsceDostawyZewnetrzneId = adres.Id
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[OpiekunowiePodmiotu] opiekunowie ON d.PodmiotId = opiekunowie.PodmiotOpiekunaPodstawowego_Id
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[Uzytkownicy] uzytkownicy ON uzytkownicy.Id = opiekunowie.UzytkownikId
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[PozycjeDokumentu] pozycje ON d.Id = pozycje.Dokument_Id 
LEFT JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[Waluty] waluta ON d.Dokument_Waluta_Id = waluta.Id
LEFT JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[KursyWalutyDokumentu] kurs ON d.Dokument_KursWalutyDokumentu_Id = kurs.Id
INNER JOIN 
    (SELECT * FROM [Nexo_Goodmark Trading].[ModelDanychContainer].[Asortymenty] WHERE Symbol <> 'TRANSPORT IN POST' AND Symbol <> 'TRANSPORT') asortyment ON pozycje.AsortymentAktualnyId = asortyment.Id
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[JednostkiMiarAsortymentow] jednostki_asortymentow ON asortyment.Id = jednostki_asortymentow.Asortyment_Id
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[JednostkiMiar] miary ON jednostki_asortymentow.JednostkaMiary_Id = miary.Id
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[RodzajeAsortymentu] rodzaj ON asortyment.Rodzaj_Id = rodzaj.Id
INNER JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[GrupyAsortymentu] grupa ON asortyment.Grupa_Id = grupa.Id
LEFT JOIN 
    [Nexo_Goodmark Trading].[ModelDanychContainer].[DokumentDokument] faktura ON faktura.DokumentyRealizujace_Id = d.Id
WHERE 
    (d.Symbol = 'ZK' OR d.Symbol = 'FP') AND (d.DataWprowadzenia >= '2024-07-01')
GROUP BY 
    d.id, d.DataWprowadzenia, d.NumerWewnetrzny_PelnaSygnatura, d.Symbol, d.Uwagi, d.Zamkniety, d.StatusDokumentuId,
    podmiot.Nazwa, podmiot.Id, uzytkownicy.Login, adres.LiniaCalosc, waluta.Symbol, kurs.Kurs
ORDER BY 
    d.id DESC;
    `);

    return result.recordset; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from MSSQL:", error);
    throw error; // Rethrow the error for handling in the calling function
  } finally {
    await pool.close(); // Close the connection
  }
};
