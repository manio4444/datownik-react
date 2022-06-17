import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Card, Icon } from 'semantic-ui-react';

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
  addNew,
}) {
  const OptionalThumbWrapper = function ({ children }) {
    return placeholder || addNew ? (
      <>{children}</>
    ) : (
      <Link
        to={!placeholder && `/${RouterPaths.DOCS_SINGLE.replace(':id', id)}`}
      >
        {children}
      </Link>
    );
  };

  return (
    <Card
      className={clsx('docs__card', { 'docs__card--placeholder': placeholder })}
    >
      <OptionalThumbWrapper>
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
          ) : addNew ? (
            <div className={'docs__card-html docs__card-html--new'}>
              <Icon name="plus" size="huge" />
            </div>
          ) : (
            <div
              className={'docs__card-html'}
              dangerouslySetInnerHTML={{ __html: txt }}
            />
          )}
        </div>
      </OptionalThumbWrapper>
      <Card.Content>
        <Card.Header>
          {placeholder ? (
            <Placeholder />
          ) : addNew ? (
            'Dodaj nowy dokument'
          ) : (
            title
          )}
        </Card.Header>
        <Card.Meta>{date_start}</Card.Meta>
        <Card.Description>
          {!addNew && 'Last edit: '}
          {placeholder ? <Placeholder inline width={120} /> : date_edit}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
