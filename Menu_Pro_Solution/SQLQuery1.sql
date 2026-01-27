INSERT INTO Payments
(BookingId, Amount, PaymentType, PaymentStatus, PaymentDate)
VALUES
(1, 630, 'Combined', 'Success', GETDATE()),
(2, 550, 'Combined', 'Success', GETDATE());
