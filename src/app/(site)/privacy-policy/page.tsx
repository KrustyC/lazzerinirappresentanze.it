import type { Metadata } from "next";

import { CenteredColumn } from "@/components/CenteredColumn";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

/**
 * The Gatsby site's policy, carried over word for word minus the sections it
 * hid with `display: none`. It still cites D.Lgs. 196/2003 art. 7/13 rather
 * than the GDPR — see docs/runbooks/privacy-policy.md before editing it.
 */
export default function PrivacyPolicyPage() {
  return (
    <CenteredColumn className="mb-24 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_li]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
      <h1 className="mb-6 text-3xl md:text-4xl">Privacy Policy</h1>
      <p>
        <strong>
          Informativa ai sensi dell&apos;art. 13 del Codice della Privacy
        </strong>
      </p>
      <p>
        <b>
          Ai sensi dell&apos;articolo 13 del codice della D.Lgs. 196/2003, vi
          rendiamo le seguenti informazioni.
        </b>
      </p>
      <p>
        Noi di <strong>lazzerinirappresentanze.it</strong> riteniamo che la
        privacy dei nostri visitatori sia estremamente importante. Questo
        documento descrive dettagliatamente i tipi di informazioni personali
        raccolti e registrati dal nostro sito e come essi vengano utilizzati.
      </p>

      <h2>File di Registrazione (Log Files)</h2>
      <p>
        Come molti altri siti web, il nostro utilizza file di log. Questi file
        registrano semplicemente i visitatori del sito - di solito una procedura
        standard delle aziende di hosting e dei servizi di analisi degli
        hosting.
      </p>
      <p>
        Le informazioni contenute nei file di registro comprendono indirizzi di
        protocollo Internet (IP), il tipo di browser, Internet Service Provider
        (ISP), informazioni come data e ora, pagine referral, pagine
        d&apos;uscita ed entrata o il numero di clic.
      </p>
      <p>
        Queste informazioni vengono utilizzate per analizzare le tendenze,
        amministrare il sito, monitorare il movimento degli utenti sul sito e
        raccogliere informazioni demografiche. Gli indirizzi IP e le altre
        informazioni non sono collegate a informazioni personali che possono
        essere identificate, dunque{" "}
        <strong>
          tutti i dati sono raccolti in forma assolutamente anonima
        </strong>
        .
      </p>

      <section id="cookies">
        <h2>Questo sito web utilizza i Cookies</h2>
        <p>
          I cookies sono piccoli file di testo che vengono automaticamente
          posizionati sul PC del navigatore all’interno del browser. Essi
          contengono informazioni di base sulla navigazione in Internet e grazie
          al browser vengono riconosciuti ogni volta che l’utente visita il
          sito.
        </p>
        <h2>Cookie Policy</h2>
        <p>
          Questo sito utilizza cookies, anche di terze parti, per migliorarne
          l’esperienza di navigazione, consentire a chi naviga di usufruire di
          eventuali servizi online e monitorare la navigazione nel sito.
        </p>
        <h2>Come disabilitare i Cookies</h2>
        <p>
          E’ possibile disabilitare i cookies direttamente dal browser
          utilizzato, accedendo alle impostazioni (preferenze oppure opzioni):
          questa scelta potrebbe limitare alcune funzionalità di navigazione del
          sito.
        </p>
        <h2>Gestione dei Cookies</h2>
        <p>
          I cookies utilizzati in questo sito possono rientrare nelle categorie
          descritte di seguito.
        </p>
        <ul>
          <li>
            <strong>Attività strettamente necessarie al funzionamento</strong>
            <br />
            Questi cookies hanno natura tecnica e permettono al sito di
            funzionare correttamente. Ad esempio, mantengono l’utente collegato
            durante la navigazione evitando che il sito richieda di collegarsi
            più volte per accedere alle pagine successive.
          </li>
          <li>
            <strong>Attività di salvataggio delle preferenze</strong>
            <br />
            Questi cookie permettono di ricordare le preferenze selezionate
            dall’utente durante la navigazione, ad esempio, consentono di
            impostare la lingua.
          </li>
          <li>
            <strong>
              Attività Statistiche e di Misurazione dell’audience (es: Google
              Analytics)
            </strong>
            <br />
            Questi cookie ci aiutano a capire, attraverso dati raccolti in forma
            anonima e aggregata, come gli utenti interagiscono con i siti
            internet fornendo informazioni relative alle sezioni visitate, il
            tempo trascorso sul sito, eventuali malfunzionamenti. Questo aiuta a
            migliorare la resa dei siti internet.
          </li>
          <li>
            <strong>Cookie di social media (es: Facebook)</strong>
            <br />
            Questi cookie di terza parte vengono utilizzati per integrare alcune
            diffuse funzionalità dei principali social media e fornirle
            all’interno del sito. In particolare permettono la registrazione e
            l’autenticazione sul sito tramite facebook e google connect, la
            condivisione e i commenti di pagine del sito sui social, abilitano
            le funzionalità del “mi piace” su Facebook e del “+1″ su G+.
          </li>
        </ul>
      </section>

      <section>
        <h2>I nostri partner pubblicitari</h2>
        <p>
          Alcuni dei nostri partner pubblicitari possono utilizzare i cookies
          sul nostro sito per raccogliere dati sulla navigazione degli utenti in
          forma anonima. Tra i nostri partner pubblicitari figurano:
        </p>
        <ul>
          <li>Google</li>
        </ul>
        <p>
          Gli annunci dei fornitori terze parti gestiscono reti pubblicitarie
          che utilizzano la tecnologia dei cookies nei rispettivi annunci e nei
          link che appaiono sul nostro sito. Gli annunci vengono così inviati
          direttamente al tuo browser. Riceveranno automaticamente il tuo
          indirizzo IP. Altre tecnologie (come i cookie o JavaScript) possono
          anche essere utilizzati dalle reti pubblicitarie di terze parti del
          nostro sito per misurare l&apos;efficacia delle loro campagne
          pubblicitarie e/o personalizzare i contenuti pubblicitari che vedete
          sul sito.
        </p>
        <p>
          Il nostro sito non ha accesso o non controlla questi cookie utilizzati
          da inserzionisti di terze parti.
        </p>
        <h2>Norme sulla privacy di terze parti</h2>
        <p>
          È necessario consultare le rispettive norme sulla privacy di questi
          server di terze parti per ulteriori informazioni sulle loro pratiche e
          per istruzioni su come disattivare alcune pratiche.
        </p>
        <p>
          La nostra politica sulla privacy non si applica ai fornitori di terze
          parti ed ai partner pubblicitari, e non possiamo controllare le
          attività di tali altri inserzionisti o siti web.
        </p>
        <p>
          Se desideri disattivare i cookie, puoi farlo attraverso le tue singole
          opzioni del browser. Ulteriori informazioni sulla gestione dei cookie
          con browser web specifico possono essere trovati nei rispettivi siti
          web dei browser
        </p>
      </section>

      <h2>Finalità del trattamento</h2>
      <p>
        I dati possono essere raccolti per una o più delle seguenti finalità:
      </p>
      <ul>
        <li>
          fornire l&apos;accesso ad aree riservate del Portale e di Portali/siti
          collegati con il presente e all&apos;invio di comunicazioni anche di
          carattere commerciale, notizie, aggiornamenti sulle iniziative di
          questo sito e delle società da essa controllate e/o collegate e/o
          Sponsor.
        </li>
        <li>
          eventuale cessione a terzi dei suddetti dati, sempre finalizzata alla
          realizzazione di campagne di email marketing ed all&apos;invio di
          comunicazioni di carattere commerciale.
        </li>
        <li>eseguire gli obblighi previsti da leggi o regolamenti;</li>
        <li>gestione contatti;</li>
      </ul>

      <h2>Modalità del trattamento</h2>
      <p>I dati verranno trattati con le seguenti modalità:</p>
      <ul>
        <li>raccolta dati con modalità single-opt, in apposito database;</li>
        <li>
          registrazione ed elaborazione su supporto cartaceo e/o magnetico;
        </li>
        <li>
          organizzazione degli archivi in forma prevalentemente automatizzata,
          ai sensi del Disciplinare Tecnico in materia di misure minime di
          sicurezza, Allegato B del Codice della Privacy.
        </li>
      </ul>

      <h2>Natura obbligatoria</h2>
      <p>Tutti i dati richiesti sono obbligatori.</p>

      <h2>Diritti dell&apos;interessato</h2>
      <p>
        Ai sensi ai sensi dell&apos;art. 7 (Diritto di accesso ai dati personali
        ed altri diritti) del Codice della Privacy, vi segnaliamo che i vostri
        diritti in ordine al trattamento dei dati sono:
      </p>
      <ul>
        <li>
          conoscere, mediante accesso gratuito l&apos;esistenza di trattamenti
          di dati che possano riguardarvi;
        </li>
        <li>essere informati sulla natura e sulle finalità del trattamento</li>
        <li>
          ottenere a cura del titolare, senza ritardo:
          <ul className="mt-2">
            <li>
              la conferma dell&apos;esistenza o meno di dati personali che vi
              riguardano, anche se non ancora registrati, e la comunicazione in
              forma intellegibile dei medesimi dati e della loro origine, nonché
              della logica e delle finalità su cui si basa il trattamento; la
              richiesta può essere rinnovata, salva l&apos;esistenza di
              giustificati motivi, con intervallo non minore di novanta giorni;
            </li>
            <li>
              la cancellazione, la trasformazione in forma anonima o il blocco
              dei dati trattati in violazione di legge, compresi quelli di cui
              non è necessaria la conservazione in relazione agli scopi per i
              quali i dati sono stati raccolti o successivamente trattati;
            </li>
            <li>
              l&apos;aggiornamento, la rettifica ovvero, qualora vi abbia
              interesse, l&apos;integrazione dei dati esistenti;
            </li>
            <li>
              opporvi in tutto o in parte per motivi legittimi al trattamento
              dei dati personali che vi riguardano ancorché pertinenti allo
              scopo della raccolta;
            </li>
          </ul>
        </li>
      </ul>
      <p>
        Vi segnaliamo che il titolare del trattamento ad ogni effetto di legge
        è:
      </p>
      <ul>
        <li>
          <b>Lazzerini Rappresentanze S.R.L</b>
        </li>
        <li>Via Del Prucino 2/L</li>
        <li>
          {SITE.postalCode} - {SITE.city} ({SITE.province})
        </li>
        <li>Tel/Fax: {SITE.phone}</li>
        <li>
          E-mail:{" "}
          <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
        </li>
      </ul>
      <p>
        Per esercitare i diritti previsti all&apos;art. 7 del Codice della
        Privacy ovvero per la cancellazione dei vostri dati dall&apos;archivio,
        è sufficiente contattarci attraverso uno dei canali messi a
        disposizione.
      </p>
      <p>
        Tutti i dati sono protetti attraverso l&apos;uso di antivirus, firewall
        e protezione attraverso password.
      </p>

      <h2>Informazioni per i bambini</h2>
      <p>
        Riteniamo importante assicurare una protezione aggiunta ai bambini
        online. Noi incoraggiamo i genitori e i tutori a trascorrere del tempo
        online con i loro figli per osservare, partecipare e/o monitorare e
        guidare la loro attività online. Noi non raccogliamo dati personali di
        minori. Se un genitore o un tutore crede che il nostro sito abbia nel
        suo database le informazioni personali di un bambino, vi preghiamo di
        contattarci immediatamente (utilizzando la mail fornita) e faremo di
        tutto per rimuovere tali informazioni il più presto possibile.
      </p>
      <p>
        Questa politica sulla privacy si applica solo alle nostre attività
        online ed è valida per i visitatori del nostro sito web e per quanto
        riguarda le informazioni condivise e/o raccolte. Questa politica non si
        applica a qualsiasi informazione raccolta in modalità offline o tramite
        canali diversi da questo sito web.
      </p>

      <h2>Consenso</h2>
      <p>
        Usando il nostro sito web, acconsenti alla nostra politica sulla privacy
        e accetti i suoi termini. Se desideri ulteriori informazioni o hai
        domande sulla nostra politica sulla privacy non esitare a contattarci.
      </p>
    </CenteredColumn>
  );
}
