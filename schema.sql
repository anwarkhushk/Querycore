-- Create custom types for status
CREATE TYPE customer_status AS ENUM ('Active', 'Inactive');
CREATE TYPE order_status AS ENUM ('Completed', 'Processing', 'Pending', 'Cancelled');

CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    status customer_status DEFAULT 'Active',
    spend DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    total DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    status order_status DEFAULT 'Processing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Insert some initial mock data
INSERT INTO customers (name, email, status, spend) VALUES 
('John Doe', 'john@example.com', 'Active', 1200.00),
('Jane Smith', 'jane@example.com', 'Active', 850.00),
('Bob Johnson', 'bob@example.com', 'Inactive', 0.00)
ON CONFLICT (email) DO NOTHING;

INSERT INTO products (sku, name, price, stock) VALUES 
('PROD-001', 'Premium Analytics Plan', 99.00, 1000),
('PROD-002', 'Standard Analytics Plan', 49.00, 5000),
('SERV-001', 'Consulting Hour', 150.00, 50)
ON CONFLICT (sku) DO NOTHING;
