CREATE TABLE Artists (
    Id INT NOT NULL,
    CONSTRAINT PK_Artists PRIMARY KEY (Id),
    Name VARCHAR(100) NOT NULL,
    CONSTRAINT UQ_Artists_Name UNIQUE (Name),
    ImageUrl VARCHAR(500),
    Country VARCHAR(100),
    ExternalSource VARCHAR(50),
    ExternalId VARCHAR(255),
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL
);


CREATE TABLE Albums (
    id INT NOT NULL,
    CONSTRAINT PK_Albums PRIMARY KEY (id),
    Title VARCHAR(150) NOT NULL,
    ArtistId INT NOT NULL,

    CONSTRAINT FK_Albums_ArtistsId 
        FOREIGN KEY (ArtistId) 
        REFERENCES Artists(Id),

    ImageUrl VARCHAR(500),
    ReleaseDate DATE,
    ExternalSource VARCHAR(50),
    ExternalId VARCHAR(255),
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP NOT NULL

);

