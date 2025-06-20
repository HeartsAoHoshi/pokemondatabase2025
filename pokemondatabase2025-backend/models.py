from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Type(db.Model):
    __tablename__ = "types"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)

    cards = db.relationship("Card", backref="type", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Set(db.Model):
    __tablename__ = "sets"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    cards = db.relationship("Card", backref="set", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Card(db.Model):
    __tablename__ = "cards"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    hp = db.Column(db.Integer)
    type_id = db.Column(db.Integer, db.ForeignKey("types.id"), nullable=False)
    set_id = db.Column(db.Integer, db.ForeignKey("sets.id"), nullable=False)
    image_url = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "hp": self.hp,
            "type": self.type.to_dict() if self.type else None,
            "set": self.set.to_dict() if self.set else None,
            "image_url": self.image_url,
            "type_id": self.type_id,
            "set_id": self.set_id
        }
