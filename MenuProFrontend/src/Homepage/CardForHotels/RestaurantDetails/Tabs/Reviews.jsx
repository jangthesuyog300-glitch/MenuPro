export default function Reviews({ reviews }) {
    if (!reviews || reviews.length === 0) {
      return <p>No reviews yet.</p>;
    }
  
    return (
      <div>
        <h3>Customer Reviews</h3>
  
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <strong>{review.user}</strong>
            <p>⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    );
  }
  