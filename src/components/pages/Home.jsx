import React from 'react'
import heroImg from '../../assets/hero.png'

const slides = [
  {
    title: 'New Season Arrivals',
    text: 'Fresh styles and trending products for everyday shopping.',
    button: 'Shop Now',
  },
  {
    title: 'Best Deals Today',
    text: 'Simple offers, clean design, and easy browsing for customers.',
    button: 'View Deals',
  },
  {
    title: 'Local Image Carousel',
    text: 'No downloads needed. Everything uses your existing project assets.',
    button: 'Explore More',
  },
]

const categories = ['Fashion', 'Electronics', 'Home', 'Beauty']

function Home() {
  return (
    <main className="home-page">
      <section className="section-block pt-4">
        <div className="container">
          <div
            id="homeCarousel"
            className="carousel slide home-carousel"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#homeCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner rounded-4 overflow-hidden shadow-sm">
              {slides.map((slide, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={slide.title}>
                  <div className="row g-0 align-items-center home-carousel-slide">
                    <div className="col-lg-6 p-4 p-lg-5">
                      <span className="section-kicker">Ecommerce Store</span>
                      <h1 className="home-carousel-title mt-3">{slide.title}</h1>
                      <p className="home-carousel-text mt-3">{slide.text}</p>
                      <div className="d-flex flex-wrap gap-3 mt-4">
                        <a className="btn hero-primary-btn" href="#products">
                          {slide.button}
                        </a>
                        <a className="btn hero-secondary-btn" href="#categories">
                          Browse Categories
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <img
                        src={heroImg}
                        className="d-block w-100 home-carousel-image"
                        alt={slide.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section-block" id="categories">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-kicker">Categories</span>
            <h2 className="section-title">Shop by category</h2>
          </div>

          <div className="row g-4">
            {categories.map((category) => (
              <div className="col-sm-6 col-lg-3" key={category}>
                <a href="#products" className="text-decoration-none">
                  <div className="category-card text-center h-100">
                    <div className="category-icon">{category.charAt(0)}</div>
                    <h3>{category}</h3>
                    <p>Browse simple product selections in {category.toLowerCase()}.</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block bg-light" id="products">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-kicker">Featured</span>
            <h2 className="section-title">Simple product cards</h2>
          </div>

          <div className="row g-4">
            {categories.map((category) => (
              <div className="col-sm-6 col-lg-3" key={category + '-product'}>
                <div className="product-card h-100">
                  <div className="product-thumb">
                    <img src={heroImg} alt={category} className="product-thumb-image" />
                  </div>
                  <div className="product-body">
                    <small className="product-category">{category}</small>
                    <h3 className="product-name">{category} Item</h3>
                    <div className="product-pricing">
                      <strong className="product-price">$99</strong>
                    </div>
                    <button className="btn product-btn mt-3 w-100" type="button">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
