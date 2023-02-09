import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Index.module.css";
import "rsuite/dist/rsuite.min.css";
import {
  Stack,
  AutoComplete,
  Form,
  DatePicker,
  RadioGroup,
  Radio,
  Button,
} from "rsuite";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function Index() {
  var [line, setLine] = useState("Null");
  var [type, settype] = useState("Null");
  var [station, setStation] = useState("Null");
  var [date, setDate] = useState("Null");
  var [duration, setDuration] = useState("Null");
  var [btnDisabled, setBtnDisabled] = useState(true)

  useEffect(()=>{
    if(line == "Null" || type == "Null" || station == "Null" || date == "Null" || duration == "Null" ){
      setBtnDisabled(true)
    }else{
      setBtnDisabled(false)
    }
  })
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
        <Image
          src="/logo.png"
          width={140}
          height={15}
          className={styles.logo}
        />
        <Stack direction="column" className={styles.stack}>
          <Form>
            <Form.Group controlId="lineId">
              <Form.ControlLabel>Numero de la ligne</Form.ControlLabel>
              <AutoComplete
                data={require("../data.json").lines}
                placeholder="3bis, 9, RER A, ..."
                size="lg"
                onChange={(e) => {
                  if (e == "") {
                    setLine("Null");
                  }
                  setLine(e);
                }}
              />
            </Form.Group>
            <Form.Group controlId="incidenttype">
              <Form.ControlLabel>Nature de l'incident</Form.ControlLabel>
              <AutoComplete
                data={require("../data.json").incident}
                placeholder="Mouvement social, panne de signalisation, incident voyageur, ..."
                size="lg"
                onChange={(e) => {
                  if (e == "") {
                    settype("Null");
                  }
                  settype(e);
                }}
              />
            </Form.Group>
            <Form.Group controlId="station">
              <Form.ControlLabel>
                Nom de la station délivrant le justificatif
              </Form.ControlLabel>
              <AutoComplete
                data={require("../data.json").stations[line]}
                placeholder="Voltaire, République, Campo-Formio, ..."
                size="lg"
                onChange={(e) => {
                  if (e == "") {
                    setStation("Null");
                  }
                  setStation(e);
                }}
              />
            </Form.Group>
            <Form.Group controlId="deliveryTime">
              <Form.ControlLabel>
                Date et heure de délivrance du justificatif
              </Form.ControlLabel>
              <DatePicker
                format="dd-MM-yyyy HH:mm"
                size="lg"
                block
                onChange={(e) => {
                  if (e == "") {
                    setDate("Null");
                  }
                  setDate(e);
                }}
              />
            </Form.Group>
            <Form.Group controlId="perturbationDuration">
              <Form.ControlLabel>Durée de la perturbation</Form.ControlLabel>
              <RadioGroup
                name="radio_perturbationDuration"
                inline
                onChange={(e) => {
                  if (e == "") {
                    setDuration("Null");
                  }
                  setDuration(e);
                }}
              >
                <Radio value="15">Inférieur à 15 minutes</Radio>
                <Radio value="30">Supérieur à 30 minutes</Radio>
              </RadioGroup>
            </Form.Group>
          </Form>
          <Stack direction="column" className={styles.submitButtonStack}>
            <Button
              disabled={btnDisabled}
              className={styles.submitButton}
              size="lg"
              onClick={() => {
                let dateOnly = date.toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
                let timeOnly = date.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                let Time = new Date(date);
                function formatNumber(number) {
                  return (number < 10 ? '0' : '') + number.toString();
                }
                if(duration == "15"){
                  Time.setMinutes(Time.getMinutes() - 12);
                }else{
                  Time.setHours(Time.getHours() - 1);
                  Time.setMinutes(Time.getMinutes() + 12);
                }
                Router.push(
                  `/justificatif?type=${type}&line=${line}&date=${dateOnly}&time=${timeOnly}&duration=${duration}&station=${station}&start=${formatNumber(Time.getHours())}:${formatNumber(Time.getMinutes())}`
                );
              }}
            >
              Générer un justificatif
            </Button>
            <p class="terms">
              Le faux justificatif de retard généré par FreeLate n'a aucune
              valeur juridique et ne peut être utilisé à des fins officielles ou
              pour justifier un retard. Il est destiné à un usage personnel
              uniquement. En appuyant sur "Générer un justificatif",
              vous acceptez de vous conformer à ces conditions et assumez toute
              responsabilité pour tout usage illégal ou non autorisé du faux
              justificatif de retard généré.
            </p>
          </Stack>
        </Stack>
      </div>
    </>
  );
}
