
  it('should respond with the appropriate CORS headers for Credentials', function (done) {
    supertest(app)
      .get('/')
      .set('Origin', 'http://example.com')
      .set('Credentials', true)
      .expect('Access-Control-Allow-Origin', 'http://example.com')
      .expect('Access-Control-Allow-Credentials', 'true')
      .expect(200, done);
  });
});*/