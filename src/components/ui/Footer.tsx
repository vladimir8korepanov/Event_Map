'use client'
import React from "react";
import Link from "next/link";

export function Footer() {
    console.log("Footer rendering"); // Отладочный лог
    return (
        <footer className="bg-[#006d77] text-white p-4 text-center shadow-inner">
            <p>&copy; 2025 Мероприятияю Все права защищены.</p>
            <div className="mt-2 text-sm text-gray-200">
                <Link href="/terms-of-use" className="hover:underline">
                    Условия использования
                </Link> |
                <Link href="/privacy-policy" className="hover:underline">
                    Политика конфиденциальности
                </Link>
            </div>
        </footer>
    );
}