import { css } from "emotion";
import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { FileShare } from "./FileShare";
import { TextShare } from "./TextShare";

export const CloudInstance = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const removeInstance = () => {
    db().ref(id).remove();
    history.goBack();
  };
  return (
    <>
      <header className={headerContainer}>
        <h1>File Cloud</h1>
        <h2>Instance ID: {id}</h2>
        <Button onClick={removeInstance} variant="danger">
          Delete Instance
        </Button>
      </header>
      <div className={flexContainer}>
        <div className={contentContainer}>
          <section>
            <TextShare instanceId={id} />
          </section>
          <section>
            <FileShare instanceId={id} />
          </section>
        </div>
      </div>
    </>
  );
};

const headerContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
`;

const flexContainer = css`
  display: flex;
  justify-content: center;
`;

const contentContainer = css`
  margin: 1rem;
  display: grid;
  grid-template-rows: 500px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 4rem;
  max-width: 1000px;
`;
