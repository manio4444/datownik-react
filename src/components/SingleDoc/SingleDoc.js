import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Editor } from '@tinymce/tinymce-react';

import './SingleDoc.scss';

import { getDoc } from './actions';
import Placeholder from 'components/Placeholder/Placeholder';
import ModalYesNo from 'components/Todo/ModalYesNo';
import { deleteDoc } from 'components/ListDocs/actions';
import { RouterPaths } from 'router/consts';

export default function SingleDoc({ id, edit }) {
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

  const handleAskSave = function () {
    console.log('### handleAskSave');
  };
  const handleAskEditName = function () {
    console.log('### handleAskEditName');
  };
  const handleAskEdit = function () {
    navigate(`/${RouterPaths.DOCS_SINGLE_EDIT.replace(':id', id)}`);
  };

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
          <Button icon={'save'} content={'Zapisz'} onClick={handleAskSave} />
          <Button
            icon={'edit outline'}
            content={'Zmień nazwę'}
            onClick={handleAskEditName}
          />
          <Button icon={'edit'} content={'Edytuj'} onClick={handleAskEdit} />
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
      ) : edit ? (
        <Editor
          initialValue={docData}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic backcolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style:
              'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
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
