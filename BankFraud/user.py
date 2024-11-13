from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)
class UserInput(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    request_date = db.Column(db.Date, nullable=False)
    days_since_request = db.Column(db.Float, nullable=False)
    credit_risk_score = db.Column(db.Integer, nullable=False)
    housing_status = db.Column(db.String(50), nullable=False)
    device_os = db.Column(db.String(50), nullable=False)
    prediction_result = db.Column(db.String(120), nullable=True)


    def set_attrs(self, attrs):
        for key, value in attrs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    def __repr__(self):
        return f'<UserInput {self.id}>'
