
        <div className={styles.leftColumn}>
          <div className={styles.title}>
            <img src={memoriesIcon} />
            <div className={styles.titleText}>Memories</div>
            {/* <p>{memoriesNumber} memories</p> */}
          </div>
          <div className={styles.productInfo}>
            <p>{productInfo.name}</p>
            <Link
              to={`/${productInfo.poster.slug}/profile`}
              className={styles.slug}
            >
              @{productInfo.poster.slug}
            </Link>
          </div>
        </div>