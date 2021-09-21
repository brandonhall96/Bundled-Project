db.createUser({
    user: 'example',
    pwd: 'example',
    roles: [
      {
        role: 'readWrite',
        db: 'campsites',
      },
    ],
  })