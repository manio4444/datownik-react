import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import './SingleDoc.scss';

import { getDoc } from './actions';
import Placeholder from 'components/Placeholder/Placeholder';
import ModalYesNo from 'components/Todo/ModalYesNo';
import { deleteDoc } from 'components/ListDocs/actions';
import { RouterPaths } from 'router/consts';

export default function SingleDoc({ id }) {
  const [docData, setDocData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalRemove, setModalRemove] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getDoc({ id })
      .then(({ data }) => {
        setDocData(data.result);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAskDeleteDoc = function () {
    setModalRemove(true);
  };

  const handleDeleteDoc = function () {
    setLoading(true);
    closeModalYesNo();
    // return;
    deleteDoc({ id })
      .then(() => {
        navigate(`/${RouterPaths.DOCS}`);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const closeModalYesNo = function () {
    setModalRemove(false);
  };

  return (
    <div className="docs__single">
      <h2>{loading ? <Placeholder /> : docData.title}</h2>

      {!loading && (
        <Button.Group className={'docs__single-buttonsGroup'}>
          <Button icon={'save'} content={'Zapisz'} />
          <Button icon={'edit outline'} content={'Zmień nazwę'} />
          <Button icon={'edit'} content={'Edutuj'} />
          <Button
            icon={'trash'}
            content={'Usuń'}
            onClick={handleAskDeleteDoc}
          />
        </Button.Group>
      )}

      {loading ? (
        <div className="docs__single-container" style={{ padding: 30 }}>
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
          <Placeholder />
        </div>
      ) : (
        <div
          className="docs__single-container"
          dangerouslySetInnerHTML={{ __html: docData.txt }}
        />
      )}

      <ModalYesNo
        open={modalRemove}
        header={docData.title}
        txt={'Czy na pewno chcesz usunąć?'}
        icon={'trash'}
        trueCallback={handleDeleteDoc}
        falseCallback={closeModalYesNo}
      />
    </div>
  );
}
