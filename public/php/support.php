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
$requiredFields = ['subject', 'description'];
foreach ($requiredFields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field $field is required"]);
        exit;
    }
}

$userId = $input['userId'] ?? null;
$subject = $input['subject'];
$priority = $input['priority'] ?? 'medium';
$category = $input['category'] ?? 'general';
$description = $input['description'];

// Validate priority
$validPriorities = ['low', 'medium', 'high', 'urgent'];
if (!in_array($priority, $validPriorities)) {
    $priority = 'medium';
}

try {
    // If userId is provided, verify user exists
    if ($userId) {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        
        if (!$stmt->fetch()) {
            $userId = null; // Allow anonymous tickets
        }
    }
    
    // Insert support ticket
    $stmt = $pdo->prepare("
        INSERT INTO support_tickets 
        (user_id, subject, priority, category, description) 
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->execute([$userId, $subject, $priority, $category, $description]);
    
    $ticketId = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'message' => 'Support ticket created successfully',
        'ticketId' => $ticketId
    ]);
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>