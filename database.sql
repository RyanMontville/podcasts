BEGIN TRANSACTION;
DROP TABLE IF EXISTS user_podcast;
DROP TABLE IF EXISTS podcasts;
DROP TABLE IF EXISTS users;

CREATE TABLE podcasts
(
	podcast_id serial NOT NULL,
	podcast_url text NOT NULL,
	podcast_title varchar(50) NOT NULL,
	podcast_image text NOT NULL,
	CONSTRAINT pk_podcasts PRIMARY KEY (podcast_id)
);

CREATE TABLE users
(
	user_id serial NOT NULL,
	username varchar(50) NOT NULL,
	CONSTRAINT pk_users PRIMARY KEY (user_id)
);

CREATE TABLE user_podcast
(
	user_id int NOT NULL,
	podcast_id int NOT NULL,
	color varchar(20) NOT NULL,
	CONSTRAINT pk_user_podcast PRIMARY KEY (user_id, podcast_id),
	CONSTRAINT fk_user_podcast_user FOREIGN KEY (user_id) REFERENCES users (user_id),
	CONSTRAINT fk_user_podcast_podcast FOREIGN KEY (podcast_id) REFERENCES podcasts (podcast_id)
);

COMMIT TRANSACTION;