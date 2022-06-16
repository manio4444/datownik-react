import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Card } from 'semantic-ui-react';

import './ListDocsCard.scss';

import { RouterPaths } from 'router/consts';
import Placeholder from 'components/Placeholder/Placeholder';

export default function ListDocsCard({
  id,
  txt,
  title,
  date_start,
  date_edit,
  placeholder,
}) {
  return (
    <Card
      className={clsx('docs__card', { 'docs__card--placeholder': placeholder })}
    >
      <Link
        to={!placeholder && `/${RouterPaths.DOCS_SINGLE.replace(':id', id)}`}
      >
        <div className={'docs__card-thumb'}>
          {placeholder ? (
            <div className={'docs__card-html'}>
              <Placeholder />
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
              className={'docs__card-html'}
              dangerouslySetInnerHTML={{ __html: txt }}
            />
          )}
        </div>
      </Link>
      <Card.Content>
        <Card.Header>{placeholder ? <Placeholder /> : title}</Card.Header>
        <Card.Meta>{date_start}</Card.Meta>
        <Card.Description>
          Last edit:{' '}
          {placeholder ? <Placeholder inline width={120} /> : date_edit}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
