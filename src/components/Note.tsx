import { Badge, Button, Col, Row, Stack } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useNote } from './NoteLayout';

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Link to={`/${note.id}/edit`}>
              <Button type="submit" variant="primary">
                Edit
              </Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                navigate('/');
              }}
              type="button"
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link to={'/'}>
              <Button type="button" variant="outline-secondary">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </>
  );
}
