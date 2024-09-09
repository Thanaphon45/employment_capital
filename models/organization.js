import promisePool from '../lib/db';

class Organization {
  constructor(organization_id, organization_name, contactPhone, contactEmail) {
    this.organization_id = organization_id;
    this.organization_name = organization_name;
    this.contactPhone = contactPhone;
    this.contactEmail = contactEmail;
  }

  static async getAll() {
    try {
      const [rows] = await promisePool.query("SELECT * FROM organization");
      return rows;
    } catch (error) {
      console.error("Error fetching organization:", error);
      throw new Error("Could not retrieve organization.");
    }
  }

  // Method to create a new organization entry
  static async create(organizationData) {
    const { organization_id, organization_name, contactPhone, contactEmail } = organizationData;
    const [result] = await promisePool.query(
      'INSERT INTO organization (organization_id, organization_name, contactPhone, contactEmail) VALUES (?, ?, ?, ?)',
      [organization_id, organization_name, contactPhone, contactEmail]
    );
    return result;
  }

  // Method to find an organization by its ID
  static async findById(organization_id) {
    const [rows] = await promisePool.query('SELECT * FROM organization WHERE organization_id = ?', [organization_id]);
    return rows[0];
  }

  // Method to update an organization by its ID
  static async update(organization_id, updatedData) {
    const { organization_name, contactPhone, contactEmail } = updatedData;
    const [result] = await promisePool.query(
      'UPDATE organization SET organization_name = ?, contactPhone = ?, contactEmail = ? WHERE organization_id = ?',
      [organization_name, contactPhone, contactEmail, organization_id]
    );
    return result;
  }

  // Method to delete an organization by its ID
  static async delete(organization_id) {
    const [result] = await promisePool.query('DELETE FROM organization WHERE organization_id = ?', [organization_id]);
    return result;
  }
}

export default Organization;
