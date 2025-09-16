CREATE TABLE account(
	id SERIAL PRIMARY KEY, -- might switch to BIGSERIAL
	name TEXT,
	image TEXT
);

CREATE TABLE auction(
	id SERIAL PRIMARY KEY,
	image TEXT NOT NULL,
	author_id INT NOT NULL,
	title TEXT NOT NULL,
	description TEXT,
	start_time TIMESTAMP,
	end_time TIMESTAMP,
	CONSTRAINT fk_account 
		FOREIGN KEY (author_id) REFERENCES account(id)
);

CREATE TABLE bid(
	id SERIAL PRIMARY KEY,
	auction_id INT NOT NULL,
	account_id INT NOT NULL,
	price NUMERIC(12, 0) NOT NULL,
	bid_time TIMESTAMP DEFAULT NOW(),
	CONSTRAINT fk_auction
		FOREIGN KEY (auction_id) REFERENCES auction(id),
	CONSTRAINT fk_account
		FOREIGN KEY (account_id) REFERENCES account(id)
);
