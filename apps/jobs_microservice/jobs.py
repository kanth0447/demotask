from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/jobs.db"
db = SQLAlchemy(app)


class Job(db.Model):
    __tablename__ = "jobs"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    status = db.Column(db.String(80), nullable=False)


@app.route("/jobs")
def get_jobs():
    jobs = Job.query.all()
    return jsonify([{"name": j.name, "status": j.status} for j in jobs])


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
