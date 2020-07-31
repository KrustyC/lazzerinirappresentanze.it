import React from "react"
import styled from "styled-components"
import { CenteredColumn } from "../components/CenteredColumn"

const Title = styled.h1`
  @media (max-width: 728px) {
    font-size: 28px;
  }
`
const SectionTitle = styled.h1`
  @media (max-width: 728px) {
    font-size: 28px;
  }
`

const Ul = styled.ul``

const Li = styled.li``

const P = styled.p`
  @media (max-width: 728px) {
    font-size: 16px;
  }
`

const PrivacyPolicy = () => (
  <CenteredColumn css="margin-bottom: 100px;">
    <Title>Privacy Policy</Title>
    <P>
      <strong>
        Informativa ai sensi dell'art. 13 del Codice della Privacy
      </strong>
    </P>
    <P>
      <b>
        Ai sensi dell'articolo 13 del codice della D.Lgs. 196/2003, vi rendiamo
        le seguenti informazioni.
      </b>
    </P>
    <P>
      Noi di{" "}
      <strong>
        <span id="sito">lazzerinirappresentanze.it</span>
      </strong>{" "}
      riteniamo che la privacy dei nostri visitatori sia estremamente
      importante. Questo documento descrive dettagliatamente i tipi di
      informazioni personali raccolti e registrati dal nostro sito e come essi
      vengano utilizzati.
    </P>
    <SectionTitle>File di Registrazione (Log Files)</SectionTitle>
    <P>
      Come molti altri siti web, il nostro utilizza file di log. Questi file
      registrano semplicemente i visitatori del sito - di solito una procedura
      standard delle aziende di hosting e dei servizi di analisi degli hosting.
    </P>
    <P>
      Le informazioni contenute nei file di registro comprendono indirizzi di
      protocollo Internet (IP), il tipo di browser, Internet Service Provider
      (ISP), informazioni come data e ora, pagine referral, pagine d'uscita ed
      entrata o il numero di clic.
    </P>
    <P>
      Queste informazioni vengono utilizzate per analizzare le tendenze,
      amministrare il sito, monitorare il movimento degli utenti sul sito e
      raccogliere informazioni demografiche. Gli indirizzi IP e le altre
      informazioni non sono collegate a informazioni personali che possono
      essere identificate, dunque{" "}
      <strong>tutti i dati sono raccolti in forma assolutamente anonima</strong>
      .
    </P>
    <div id="cookies" style={{ display: "block" }}>
      <SectionTitle>Questo sito web utilizza i Cookies</SectionTitle>
      <P>
        I cookies sono piccoli file di testo che vengono automaticamente
        posizionati sul PC del navigatore all’interno del browser. Essi
        contengono informazioni di base sulla navigazione in Internet e grazie
        al browser vengono riconosciuti ogni volta che l’utente visita il sito.
      </P>
      <SectionTitle>Cookie Policy</SectionTitle>
      <P>
        Questo sito utilizza cookies, anche di terze parti, per migliorarne
        l’esperienza di navigazione, consentire a chi naviga di usufruire di
        eventuali servizi online e monitorare la navigazione nel sito.
      </P>
      <SectionTitle>Come disabilitare i Cookies</SectionTitle>
      <P>
        E’ possibile disabilitare i cookies direttamente dal browser utilizzato,
        accedendo alle impostazioni (preferenze oppure opzioni): questa scelta
        potrebbe limitare alcune funzionalità di navigazione del sito.
      </P>
      <SectionTitle>Gestione dei Cookies</SectionTitle>
      <P>
        I cookies utilizzati in questo sito possono rientrare nelle categorie
        descritte di seguito.
      </P>
      <Ul>
        <Li>
          <strong>Attività strettamente necessarie al funzionamento</strong>
          <br />
          Questi cookies hanno natura tecnica e permettono al sito di funzionare
          correttamente. Ad esempio, mantengono l’utente collegato durante la
          navigazione evitando che il sito richieda di collegarsi più volte per
          accedere alle pagine successive.
        </Li>
        <Li>
          <strong>Attività di salvataggio delle preferenze</strong>
          <br />
          Questi cookie permettono di ricordare le preferenze selezionate
          dall’utente durante la navigazione, ad esempio, consentono di
          impostare la lingua.
        </Li>
        <Li>
          <strong>
            Attività Statistiche e di Misurazione dell’audience (es: Google
            Analytics)
          </strong>
          <br />
          Questi cookie ci aiutano a capire, attraverso dati raccolti in forma
          anonima e aggregata, come gli utenti interagiscono con i siti internet
          fornendo informazioni relative alle sezioni visitate, il tempo
          trascorso sul sito, eventuali malfunzionamenti. Questo aiuta a
          migliorare la resa dei siti internet.
        </Li>
        <Li>
          <strong>Cookie di social media (es: Facebook)</strong>
          <br />
          Questi cookie di terza parte vengono utilizzati per integrare alcune
          diffuse funzionalità dei principali social media e fornirle
          all’interno del sito. In particolare permettono la registrazione e
          l’autenticazione sul sito tramite facebook e google connect, la
          condivisione e i commenti di pagine del sito sui social, abilitano le
          funzionalità del “mi piace” su Facebook e del “+1″ su G+.
        </Li>
      </Ul>
    </div>
    <div id="fornitori" style={{ display: "none" }}>
      <SectionTitle>Fornitori di terze parti</SectionTitle>
      <P>
        I fornitori di terze parti, tra cui Google, utilizzano cookie per
        pubblicare annunci in base alle precedenti visite di un utente su questo
        sito.
      </P>
      <P>
        L'utilizzo dei cookie per la pubblicità consente a Google e ai suoi
        partner di pubblicare annunci per gli utenti di questo sito (e su altri
        siti) in base ai dati statistici raccolti su questo sito e sui siti web
        dei partner Google.
      </P>
      <P>
        Gli utenti possono scegliere di disattivare la pubblicità
        personalizzata, visitando la pagina{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Impostazioni annunci
        </a>
        .
      </P>
      <P>
        Visitando la pagina www.aboutads.info potrai disattivare i cookies dei
        fornitori di terze parti.
      </P>
    </div>
    <div id="partners" style={{ display: "block" }}>
      <SectionTitle>I nostri partner pubblicitari</SectionTitle>
      <P>
        Alcuni dei nostri partner pubblicitari possono utilizzare i cookies sul
        nostro sito per raccogliere dati sulla navigazione degli utenti in forma
        anonima. Tra i nostri partner pubblicitari figurano:
      </P>
      <Ul>
        <Li id="amazon" style={{ display: "none" }}>
          Amazon
        </Li>
        <Li id="ebay" style={{ display: "none" }}>
          Ebay
        </Li>
        <Li id="altri_partner" style={{ display: "block" }}>
          <span id="partner">Google</span>
        </Li>
      </Ul>
      <P>
        Gli annunci dei fornitori terze parti gestiscono reti pubblicitarie che
        utilizzano la tecnologia dei cookies nei rispettivi annunci e nei link
        che appaiono sul nostro sito. Gli annunci vengono così inviati
        direttamente al tuo browser. Riceveranno automaticamente il tuo
        indirizzo IP. Altre tecnologie (come i cookie o JavaScript) possono
        anche essere utilizzati dalle reti pubblicitarie di terze parti del
        nostro sito per misurare l'efficacia delle loro campagne pubblicitarie
        e/o personalizzare i contenuti pubblicitari che vedete sul sito.
      </P>
      <P>
        Il nostro sito non ha accesso o non controlla questi cookie utilizzati
        da inserzionisti di terze parti.
      </P>
      <SectionTitle>Norme sulla privacy di terze parti</SectionTitle>
      <P>
        È necessario consultare le rispettive norme sulla privacy di questi
        server di terze parti per ulteriori informazioni sulle loro pratiche e
        per istruzioni su come disattivare alcune pratiche.
      </P>
      <P>
        La nostra politica sulla privacy non si applica ai fornitori di terze
        parti ed ai partner pubblicitari, e non possiamo controllare le attività
        di tali altri inserzionisti o siti web.
      </P>
      <P>
        Se desideri disattivare i cookie, puoi farlo attraverso le tue singole
        opzioni del browser. Ulteriori informazioni sulla gestione dei cookie
        con browser web specifico possono essere trovati nei rispettivi siti web
        dei browser
      </P>
    </div>
    <SectionTitle>Finalità del trattamento</SectionTitle>
    <P>I dati possono essere raccolti per una o più delle seguenti finalità:</P>
    <Ul>
      <Li>
        fornire l'accesso ad aree riservate del Portale e di Portali/siti
        collegati con il presente e all'invio di comunicazioni anche di
        carattere commerciale, notizie, aggiornamenti sulle iniziative di questo
        sito e delle società da essa controllate e/o collegate e/o Sponsor.{" "}
      </Li>
      <Li>
        eventuale cessione a terzi dei suddetti dati, sempre finalizzata alla
        realizzazione di campagne di email marketing ed all'invio di
        comunicazioni di carattere commerciale.{" "}
      </Li>
      <Li>eseguire gli obblighi previsti da leggi o regolamenti;</Li>
      <Li>gestione contatti;</Li>
    </Ul>
    <SectionTitle>Modalità del trattamento</SectionTitle>
    <P>I dati verranno trattati con le seguenti modalità:</P>
    <Ul>
      <Li>raccolta dati con modalità single-opt, in apposito database;</Li>
      <Li>registrazione ed elaborazione su supporto cartaceo e/o magnetico;</Li>
      <Li>
        organizzazione degli archivi in forma prevalentemente automatizzata, ai
        sensi del Disciplinare Tecnico in materia di misure minime di sicurezza,
        Allegato B del Codice della Privacy.{" "}
      </Li>
    </Ul>
    <SectionTitle>Natura obbligatoria</SectionTitle>
    <P>Tutti i dati richiesti sono obbligatori.</P>

    <div id="trattamento" style={{ display: "none" }}>
      <SectionTitle>
        Soggetti a cui dati potranno essere comunicati i dati personali
      </SectionTitle>
      <P>I dati raccolti potranno essere comunicati a:</P>
      <Ul>
        <Li>
          società e imprese per usi di direct mailing o attività analoghe;
        </Li>
        <Li>
          associazioni e fondazioni intenzionate ad acquistare spazi
          pubblicitari sulle liste o sul sito e/o collegate alla fornitura di un
          particolare servizio.
        </Li>
        <Li>
          soggetti che debbano avere accesso ai dati, come da norme di legge o
          di normative secondarie e/o comunitarie.
        </Li>
      </Ul>
    </div>
    <SectionTitle>Diritti dell'interessato</SectionTitle>
    <P>
      Ai sensi ai sensi dell'art. 7 (Diritto di accesso ai dati personali ed
      altri diritti) del Codice della Privacy, vi segnaliamo che i vostri
      diritti in ordine al trattamento dei dati sono:
    </P>
    <Ul>
      <Li>
        conoscere, mediante accesso gratuito l'esistenza di trattamenti di dati
        che possano riguardarvi;
      </Li>
      <Li>essere informati sulla natura e sulle finalità del trattamento</Li>
      <Li>ottenere a cura del titolare, senza ritardo:</Li>
      <Ul>
        <Li>
          la conferma dell'esistenza o meno di dati personali che vi riguardano,
          anche se non ancora registrati, e la comunicazione in forma
          intellegibile dei medesimi dati e della loro origine, nonché della
          logica e delle finalità su cui si basa il trattamento; la richiesta
          può essere rinnovata, salva l'esistenza di giustificati motivi, con
          intervallo non minore di novanta giorni;
        </Li>
        <Li>
          la cancellazione, la trasformazione in forma anonima o il blocco dei
          dati trattati in violazione di legge, compresi quelli di cui non è
          necessaria la conservazione in relazione agli scopi per i quali i dati
          sono stati raccolti o successivamente trattati;
        </Li>
        <Li>
          l'aggiornamento, la rettifica ovvero, qualora vi abbia interesse,
          l'integrazione dei dati esistenti;
        </Li>
        <Li>
          opporvi in tutto o in parte per motivi legittimi al trattamento dei
          dati personali che vi riguardano ancorché pertinenti allo scopo della
          raccolta;
        </Li>
      </Ul>
    </Ul>
    <P>
      Vi segnaliamo che il titolare del trattamento ad ogni effetto di legge è:
    </P>
    <Ul>
      <Li>
        <b>
          <span id="azienda">Lazzerini Rappresentanze S.R.L</span>
        </b>
      </Li>
      <Li id="piva" style={{ display: "none" }}>
        P. IVA <span id="iva"></span>
      </Li>
      <Li id="codiceFiscale" style={{ display: "none" }}>
        Codice Fiscale: <span id="codice_Fiscale"></span>
      </Li>
      <Li>
        <span id="indirizzo">Via Del Prucino 2/L</span>
      </Li>
      <Li>
        <span id="cap">52037</span> - <span id="citta">Sansepolcro</span> (
        <span id="provincia">AR</span>)
      </Li>
      <Li>
        Tel/Fax: <span id="telefono">575742154</span>
      </Li>
      <Li>
        E-mail: <span id="email">lucalazze@gmail.com</span>
      </Li>
    </Ul>
    <P>
      Per esercitare i diritti previsti all'art. 7 del Codice della Privacy
      ovvero per la cancellazione dei vostri dati dall'archivio, è sufficiente
      contattarci attraverso uno dei canali messi a disposizione.
    </P>
    <P>
      Tutti i dati sono protetti attraverso l'uso di antivirus, firewall e
      protezione attraverso password.
    </P>
    <SectionTitle>Informazioni per i bambini</SectionTitle>
    <P>
      Riteniamo importante assicurare una protezione aggiunta ai bambini online.
      Noi incoraggiamo i genitori e i tutori a trascorrere del tempo online con
      i loro figli per osservare, partecipare e/o monitorare e guidare la loro
      attività online. Noi non raccogliamo dati personali di minori. Se un
      genitore o un tutore crede che il nostro sito abbia nel suo database le
      informazioni personali di un bambino, vi preghiamo di contattarci
      immediatamente (utilizzando la mail fornita) e faremo di tutto per
      rimuovere tali informazioni il più presto possibile.
    </P>
    <P>
      Questa politica sulla privacy si applica solo alle nostre attività online
      ed è valida per i visitatori del nostro sito web e per quanto riguarda le
      informazioni condivise e/o raccolte. Questa politica non si applica a
      qualsiasi informazione raccolta in modalità offline o tramite canali
      diversi da questo sito web.
    </P>
    <SectionTitle>Consenso</SectionTitle>
    <P>
      Usando il nostro sito web, acconsenti alla nostra politica sulla privacy e
      accetti i suoi termini. Se desideri ulteriori informazioni o hai domande
      sulla nostra politica sulla privacy non esitare a contattarci.
    </P>
  </CenteredColumn>
)

export default PrivacyPolicy
