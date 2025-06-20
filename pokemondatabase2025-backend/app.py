from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Card, Type, Set

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite3"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

@app.route("/")
def home():
    return {"message": "Pokemon TCG API"}

# ✅ GET all cards
@app.route("/api/cards", methods=["GET"])
def get_all_cards():
    cards = Card.query.all()
    return jsonify([card.to_dict() for card in cards])

# ✅ GET single card by ID
@app.route("/api/cards/<int:id>", methods=["GET"])
def get_card(id):
    card = Card.query.get_or_404(id)
    return jsonify(card.to_dict())

# ✅ CREATE a new card
@app.route("/api/cards", methods=["POST"])
def create_card():
    data = request.get_json()

    new_card = Card(
        name=data["name"],
        hp=data["hp"],
        type_id=data["type_id"],
        set_id=data["set_id"]
    )

    db.session.add(new_card)
    db.session.commit()

    return jsonify(new_card.to_dict()), 201

# ✅ UPDATE an existing card
@app.route("/api/cards/<int:id>", methods=["PUT"])
def update_card(id):
    card = Card.query.get_or_404(id)
    data = request.get_json()

    card.name = data.get("name", card.name)
    card.hp = data.get("hp", card.hp)
    card.type_id = data.get("type_id", card.type_id)
    card.set_id = data.get("set_id", card.set_id)

    db.session.commit()
    return jsonify(card.to_dict())

# ✅ DELETE a card
@app.route("/api/cards/<int:id>", methods=["DELETE"])
def delete_card(id):
    card = Card.query.get_or_404(id)
    db.session.delete(card)
    db.session.commit()
    return {"message": f"Card {id} deleted."}, 200

# ✅ Initialize the database
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
