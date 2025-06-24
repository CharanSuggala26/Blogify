import articleImage from "../assets/charan.jpg";

function Home() {
  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-success fw-bold">Ocean of Knowledge</h1>
      </div>
      <div className="text-center mb-4">
        <img
          src={articleImage}
          alt="Article"
          className="img-fluid rounded shadow"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      </div>
      <div className="lead text-justify">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
          officia explicabo voluptatum excepturi dignissimos dolorum iste sed
          culpa nulla ab doloremque error placeat pariatur, similique facere
          soluta impedit inventore nam voluptas eum, laboriosam ipsam minus
          voluptatibus quaerat!
        </p>
        <p>
          Consequatur animi exercitationem accusantium repudiandae error
          voluptate, eveniet adipisci, fuga nostrum eligendi a harum! Atque,
          nihil eligendi labore, omnis, deleniti dolor est rem vitae id
          doloribus tempora distinctio excepturi cumque architecto.
        </p>
        <p>
          Repudiandae amet dolor voluptatibus ad in repellendus velit et,
          inventore, quo corrupti optio ab eum recusandae nisi error aut omnis.
          Fugiat dolore vero magni ea quibusdam commodi rem dolor repellendus.
          Voluptatem, assumenda.
        </p>
      </div>
    </div>
  );
}

export default Home;
