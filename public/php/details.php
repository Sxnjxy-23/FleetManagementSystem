<?php
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON input']);
    exit;
}

// Validate required fields
$requiredFields = ['userId', 'aadharNo', 'age', 'gender', 'fatherName', 'address', 'vehicleNo', 'chassisNo'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field $field is required"]);
        exit;
    }
}

$userId = (int)$input['userId'];
$aadharNo = $input['aadharNo'];
$age = (int)$input['age'];
$gender = $input['gender'];
$fatherName = $input['fatherName'];
$address = $input['address'];
$vehicleNo = $input['vehicleNo'];
$chassisNo = $input['chassisNo'];

// Validate Aadhar number (12 digits)
if (!preg_match('/^\d{12}$/', $aadharNo)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid Aadhar number. Must be 12 digits']);
    exit;
}

// Validate age
if ($age < 18 || $age > 100) {
    http_response_code(400);
    echo json_encode(['error' => 'Age must be between 18 and 100']);
    exit;
}

try {
    // Check if user exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    
    if (!$stmt->fetch()) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found']);
        exit;
    }
    
    // Check if details already exist
    $stmt = $pdo->prepare("SELECT id FROM user_details WHERE user_id = ?");
    $stmt->execute([$userId]);
    
    if ($stmt->fetch()) {
        // Update existing details
        $stmt = $pdo->prepare("
            UPDATE user_details SET 
            aadhar_no = ?, age = ?, gender = ?, father_name = ?, 
            address = ?, vehicle_no = ?, chassis_no = ?
            WHERE user_id = ?
        ");
        $stmt->execute([$aadharNo, $age, $gender, $fatherName, $address, $vehicleNo, $chassisNo, $userId]);
    } else {
        // Insert new details
        $stmt = $pdo->prepare("
            INSERT INTO user_details 
            (user_id, aadhar_no, age, gender, father_name, address, vehicle_no, chassis_no) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$userId, $aadharNo, $age, $gender, $fatherName, $address, $vehicleNo, $chassisNo]);
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'User details saved successfully'
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>