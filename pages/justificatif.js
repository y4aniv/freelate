import Head from "next/head";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import PagePreviousIcon from '@rsuite/icons/PagePrevious';

export default function Justificatif() {
  const router = useRouter();
  const { type } = router.query;
  const { line } = router.query;
  const { date } = router.query;
  const { time } = router.query;
  const { duration } = router.query;
  const { station } = router.query;
  const { start } = router.query;

  useEffect(() => {
    
  if(!type || !line || !date || !time || !duration || !station || !start){
    window.location.href = "./"
  }

    if (duration == 15) {
      document.getElementsByClassName("check30")[0].style.display = "none";
      document.getElementsByClassName("check15")[0].style.display = "block";
    } else {
      document.getElementsByClassName("check15")[0].style.display = "none";
      document.getElementsByClassName("check30")[0].style.display = "block";
    }
    document.getElementsByClassName("natureIncident")[0].innerText = type;
    document.getElementsByClassName("icon")[0].src = `/lines/${line}.png`;
    document.getElementsByClassName(
      "deliveryDate"
    )[0].innerHTML = `${date} <l>à</l> ${time}`;
    document.getElementsByClassName(
      "incidentDate"
    )[0].innerHTML = `${date} <l>à</l> ${start}`;
    document.getElementsByClassName("deliveryStation")[0].innerText = station;
    var node = document.getElementById('justificatif');
  });
  return (
    <>
      <Head>
        <title>
          FreeLate - Générez vos justificatifs de retard directement en ligne
        </title>
        <meta
          name="description"
          content="Un retard ? Ne paniquez plus, FreeLate est là pour vous ! Générez dès maintenant vos justificatifs pour les 20 lignes de métro et de RER administrées par la RATP."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div>
        <PagePreviousIcon class="retour" onClick={()=>{
          Router.push("/")
        }}/>
        <div id="justificatif"  >
          <div class="check15"></div>
          <div class="check30"></div>
          <p class="natureIncident"></p>
          <img class="icon"></img>
          <p class="incidentDate"></p>
          <p class="deliveryDate">08/02/2023</p>
          <p class="deliveryStation"></p>
          <p class="agent">
            PW{10000 + Math.floor(Math.random() * (99999 - 10000 + 1))}
          </p>
  
          <Image
            src="/JustificatifRetard.png"
            width={420 * 2}
            height={526 * 2}
            className="JustificatifMockup"
          />
        </div>
      </div>
    </>
  )
}
