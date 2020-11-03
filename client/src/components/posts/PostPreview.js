import { Link } from 'react-router-dom';

export default () => {

    return <Link to="/1stpost" className="card mb-3 preview-card-link">
    <div className="card-body">
      <h3 className="card-title">Card title</h3>
      <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" className="card-link">Card link</a>
      <a href="#" className="card-link">Another link</a>
    </div>
  </Link>
}