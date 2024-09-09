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
      SELECT d.id AS documentId,
             d.DataWprowadzenia AS dateInsert,
             d.NumerWewnetrzny_PelnaSygnatura AS signature,
             d.Symbol AS symbol,
             d.Uwagi AS details,
             d.Zamkniety AS closed,
             d.StatusDokumentuId AS documentStatus,
			       d.TimeStamp,
             podmiot.Nazwa AS client,
             podmiot.Id AS companyId,
             uzytkownicy.Login AS trader,
             adres.LiniaCalosc AS deliveryAddress,
			       pozycje.id AS orderId,
             pozycje.Ilosc AS quantity,
             pozycje.Cena_NettoPoRabacie AS price,
             pozycje.Wartosc_NettoPoRabacie AS netValue,
             waluta.Symbol AS currency,
             kurs.Kurs AS exchangeRate,
             asortyment.Symbol AS code,
             asortyment.Nazwa AS assortment,
             asortyment.id AS productId,
             miary.Symbol AS unit,
             grupa.Nazwa AS type,
             rodzaj.Symbol AS kind
      FROM [Nexo_Goodmark Trading].[ModelDanychContainer].[Dokumenty] d 
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[PodmiotHistorie] podmiot 
      ON d.PodmiotWybranyId = podmiot.Id 
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[AdresHistorie] adres 
      ON d.MiejsceDostawyId = adres.Id or d.MiejsceDostawyZewnetrzneId = adres.Id
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[OpiekunowiePodmiotu] opiekunowie
      ON d.PodmiotId = opiekunowie.PodmiotOpiekunaPodstawowego_Id
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[Uzytkownicy] uzytkownicy
      ON uzytkownicy.Id = opiekunowie.UzytkownikId
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[PozycjeDokumentu] pozycje 
      ON d.Id = pozycje.Dokument_Id 
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[Waluty] waluta
      ON d.Dokument_Waluta_Id = waluta.Id
      LEFT OUTER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[KursyWalutyDokumentu] kurs
      ON d.Dokument_KursWalutyDokumentu_Id = kurs.Id
      INNER JOIN (Select * FROM [Nexo_Goodmark Trading].[ModelDanychContainer].[Asortymenty] WHERE Symbol <> 'TRANSPORT IN POST' and Symbol <> 'TRANSPORT') asortyment
      ON pozycje.AsortymentAktualnyId = asortyment.Id
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[JednostkiMiarAsortymentow] jednostki_asortymentow
      ON asortyment.Id = jednostki_asortymentow.Asortyment_Id
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[JednostkiMiar] miary
      ON jednostki_asortymentow.JednostkaMiary_Id = miary.Id
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[RodzajeAsortymentu] rodzaj
      ON asortyment.Rodzaj_Id = rodzaj.Id
      INNER JOIN [Nexo_Goodmark Trading].[ModelDanychContainer].[GrupyAsortymentu] grupa
      ON asortyment.Grupa_Id = grupa.Id
      WHERE (d.Symbol = 'ZK' or d.Symbol = 'FP') and (d.DataWprowadzenia >= '2024-08-01')
      ORDER BY d.Id DESC
    `);

    return result.recordset; // Return the fetched data
  } catch (error) {
    console.error("Error fetching data from MSSQL:", error);
    throw error; // Rethrow the error for handling in the calling function
  } finally {
    await pool.close(); // Close the connection
  }
};
