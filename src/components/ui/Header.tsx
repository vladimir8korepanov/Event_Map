"use client";

import React, { useCallback, useRef, ChangeEvent, useMemo } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Search } from "lucide-react";
import { useSearchStore } from "@/features/search/model/searchStore";
import { debounce } from "@/shared/lib/debounce";
import { useGeolocationStore } from "@/features/geolocation/model/geolocation";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

export function Header() {
  const setQuery = useSearchStore((state) => state.setQuery);
  const { setUserLocation } = useGeolocationStore();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 300),
    [setQuery]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      debouncedSetQuery(e.target.value);
    },
    [debouncedSetQuery]
  );

  const handleGeolocationRequest = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          if (dialogCloseRef.current) {
            console.log("Диалог закрыт успешно через useRef");
            dialogCloseRef.current?.click();
          } else {
            console.error("Кнопка закрытия диалога не найдена (useRef)");
          }
        },
        (error) => {
          console.error("Ошибка получения геолокации:", error);
          dialogCloseRef.current?.click();
        }
      );
    } else {
      console.error("Геолокация не поддерживается вашим браузером.");
      dialogCloseRef.current?.click();
    }
  }, [setUserLocation]);

  console.log("Header rendering");

  return (
    <header className="bg-[#006d77] text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <h1 className="text-3xl tracking-wide mr-auto font-orelega">Карта мероприятий</h1>
        <div className="relative w-full max-w-xs sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Поиск событий..."
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 bg-white text-black"
          />
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button className="flex flex-col sm:flex-row items-center gap-2 bg-[#edf6f9] text-[#006d77] hover:bg-[#83c5be] transition-colors px-3 py-1 text-xs 
                sm:px-4 sm:py-2 sm:text-sm 
                md:px-6 md:py-3 md:text-base 
                lg:px-8 lg:py-4 lg:text-base">
              <span>Местоположение</span>
              <Image
                src="/image/gps.png"
                alt="Доступ к Вашему местоположению"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                priority
              />
            </Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fadeIn z-[1000]" />
            <Dialog.Content className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg animate-slideIn z-[1000] w-[90%] max-w-md">
              <Dialog.Title className="text-lg font-bold">
                Разрешить доступ к местоположению?
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-gray-600">
                Мы хотим использовать ваше местоположение, чтобы показать ближайшие события.
              </Dialog.Description>
              <div className="mt-4 flex justify-end space-x-2">
                <Dialog.Close asChild>
                  <Button
                    variant="outline"
                    className="bg-[#edf6f9] text-[#006d77] px-4 py-2"
                    ref={dialogCloseRef}
                  >
                    Отмена
                  </Button>
                </Dialog.Close>
                <Button
                  onClick={handleGeolocationRequest}
                  className="bg-[#edf6f9] text-[#006d77] hover:bg-[#83c5be] transition-colors px-4 py-2"
                >
                  Разрешить
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}